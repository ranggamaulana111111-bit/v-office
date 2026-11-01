'use client'
import { createContext, useContext } from 'react'
import type { ApiState } from './useApiStatus'

export const OperationalContext = createContext<ApiState | null>(null)

export function useOperational() {
  return useContext(OperationalContext)
}
