'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { apiUrl, HEALTH_URL } from './api'

export type OperationalData = {
  generated_at: string
  source: string
  devices: {
    monitored: number
    online: number
    offline: number
    avg_ping_ms: number
    domains: { domain: string; http_status: number; ping_ms: number; ssl_days_left: number }[]
  }
  tasks: { total: number; by_status: Record<string, number> }
  billing: { invoices: number; outstanding: number; cash: number }
  projects: { total: number; avg_readiness: number; budget: number }
  agents: { logs: number; latest: unknown }
  lobby: { status: string; owner: string }
}

export type ApiState = {
  online: boolean
  latency: number | null
  lastUpdated: string | null
  operational: OperationalData | null
  error: string | null
}

const EMPTY: ApiState = {
  online: false,
  latency: null,
  lastUpdated: null,
  operational: null,
  error: null,
}

export function useApiStatus(pollMs = 15000) {
  const [state, setState] = useState<ApiState>(EMPTY)
  const [nonce, setNonce] = useState(0)
  const alive = useRef(true)

  const request = useCallback(async () => {
    const started = performance.now()
    try {
      const health = await fetch(HEALTH_URL, { cache: 'no-store' })
      const latency = Math.round(performance.now() - started)
      if (!health.ok) throw new Error(`health ${health.status}`)
      let operational: OperationalData | null = null
      try {
        const op = await fetch(apiUrl('/public/operational'), { cache: 'no-store' })
        if (op.ok) operational = (await op.json()) as OperationalData
      } catch {
        operational = null
      }
      if (!alive.current) return
      setState({ online: true, latency, lastUpdated: new Date().toISOString(), operational, error: null })
    } catch (e) {
      if (!alive.current) return
      setState((s) => ({
        online: false,
        latency: null,
        lastUpdated: s.lastUpdated,
        operational: null,
        error: (e as Error).message,
      }))
    }
  }, [])

  useEffect(() => {
    alive.current = true
    request()
    const interval = setInterval(request, pollMs)
    return () => {
      alive.current = false
      clearInterval(interval)
    }
  }, [request, pollMs, nonce])

  const refresh = useCallback(() => setNonce((n) => n + 1), [])

  return { ...state, refresh }
}
