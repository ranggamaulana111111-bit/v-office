const RAW = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8000/api'

export const API_BASE = RAW.replace(/\/+$/, '')

export const apiUrl = (path: string) => {
  const p = path.startsWith('/') ? path : `/${path}`
  if (API_BASE.endsWith('/v1') || p.startsWith('/v1/')) return `${API_BASE}${p}`
  return `${API_BASE}/v1${p}`
}

export const HEALTH_URL = apiUrl('/health')
