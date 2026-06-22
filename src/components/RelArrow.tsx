import { useLayoutEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Geo {
  w: number
  h: number
  d: string
  apex: { x: number; y: number }
  head: { x: number; y: number; a: number }
}

// El 5º canal: una flecha que CODIFICA una relación gramatical (verbo -> CD,
// "¿qué?"). Se dibuja sola (pathLength). Con reduced-motion, estado final fijo.
export function RelArrow({
  containerRef,
  fromId,
  toId,
  label,
  color = '#3b6d11',
}: {
  containerRef: React.RefObject<HTMLElement | null>
  fromId: string
  toId: string
  label?: string
  color?: string
}) {
  const reduced = useReducedMotion()
  const [geo, setGeo] = useState<Geo | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      const cont = containerRef.current
      if (!cont) return
      const from = cont.querySelector(`[data-gid="${fromId}"]`) as HTMLElement | null
      const to = cont.querySelector(`[data-gid="${toId}"]`) as HTMLElement | null
      if (!from || !to) {
        setGeo(null)
        return
      }
      const cr = cont.getBoundingClientRect()
      const fr = from.getBoundingClientRect()
      const tr = to.getBoundingClientRect()
      const fx = fr.left + fr.width / 2 - cr.left
      const fy = fr.top - cr.top
      const tx = tr.left + tr.width / 2 - cr.left
      const ty = tr.top - cr.top
      const apexY = Math.min(fy, ty) - 24
      const midx = (fx + tx) / 2
      const a = Math.atan2(ty - apexY, tx - midx)
      setGeo({
        w: cr.width,
        h: cr.height,
        d: `M ${fx} ${fy} Q ${midx} ${apexY} ${tx} ${ty}`,
        apex: { x: midx, y: apexY },
        head: { x: tx, y: ty, a },
      })
    }
    measure()
    const t = window.setTimeout(measure, 140) // tras asentar el layout/reveal
    window.addEventListener('resize', measure)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', measure)
    }
  }, [containerRef, fromId, toId])

  if (!geo) return null
  const len = 7
  const { x: hx, y: hy, a } = geo.head
  const h1 = `${hx - len * Math.cos(a - 0.5)} ${hy - len * Math.sin(a - 0.5)}`
  const h2 = `${hx - len * Math.cos(a + 0.5)} ${hy - len * Math.sin(a + 0.5)}`

  return (
    <svg
      className="rel-arrow"
      width={geo.w}
      height={geo.h}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', overflow: 'visible' }}
      aria-hidden="true"
    >
      <motion.path
        d={geo.d}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
      />
      <motion.path
        d={`M ${h1} L ${hx} ${hy} L ${h2}`}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.45, duration: 0.15 }}
      />
      {label && (
        <motion.text
          x={geo.apex.x}
          y={geo.apex.y - 5}
          textAnchor="middle"
          fontSize="13"
          fontWeight="500"
          fill={color}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { delay: 0.5 }}
        >
          {label}
        </motion.text>
      )}
    </svg>
  )
}
