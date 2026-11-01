import * as THREE from 'three'

const cache = new Map<string, THREE.MeshStandardMaterial>()

export function std(
  color: string,
  roughness = 0.7,
  metalness = 0.05,
  emissive?: string,
  emissiveIntensity = 0,
) {
  const key = `${color}|${roughness}|${metalness}|${emissive ?? '-'}|${emissiveIntensity}`
  const hit = cache.get(key)
  if (hit) return hit
  const m = new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    emissive: emissive ? new THREE.Color(emissive) : new THREE.Color('#000000'),
    emissiveIntensity,
  })
  cache.set(key, m)
  return m
}

export const MATS = {
  wood: std('#c19a6b', 0.68, 0.03),
  woodLight: std('#dcc39a', 0.72, 0.02),
  woodDark: std('#7c5236', 0.72, 0.03),
  walnut: std('#6b4429', 0.66, 0.04),
  white: std('#f4f6f9', 0.55, 0.02),
  offWhite: std('#e8edf3', 0.62, 0.02),
  concrete: std('#b5bec9', 0.92, 0.02),
  concreteDark: std('#8b95a3', 0.9, 0.02),
  metal: std('#3f4a59', 0.38, 0.82),
  metalLight: std('#8f9aa8', 0.35, 0.75),
  dark: std('#1c2430', 0.6, 0.35),
  graphite: std('#2b3442', 0.55, 0.5),
  glass: std('#bcd7ea', 0.08, 0.05),
  screen: std('#0b1725', 0.25, 0.35),
  screenGlow: std('#0ea5e9', 0.3, 0.1, '#0ea5e9', 0.85),
  screenGreen: std('#22c55e', 0.3, 0.1, '#22c55e', 0.8),
  screenAmber: std('#f59e0b', 0.3, 0.1, '#f59e0b', 0.8),
  leaf: std('#1f7a3d', 0.85, 0.02),
  leafLight: std('#2f9e50', 0.8, 0.02),
  fabric: std('#5b6b7f', 0.96, 0.01),
  fabricLight: std('#93a2b4', 0.96, 0.01),
  fabricDark: std('#334155', 0.95, 0.02),
  rug: std('#8fa0b4', 0.98, 0),
  red: std('#8f2a2a', 0.42, 0.55),
  paper: std('#f5edc8', 0.92, 0),
  tv: std('#0a1120', 0.22, 0.4),
  alert: std('#ef4444', 0.35, 0.2, '#ef4444', 0.6),
}

export const ACCENT = (c: string) => std(c, 0.45, 0.15, c, 0.35)

export const CYAN = '#0ea5e9'
export const CORPORATE = '#2563eb'
