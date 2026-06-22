import { motion } from 'framer-motion'
import type { LGroup, LessonRole } from '../types'
import { fn } from '../theme'

type Colored = Exclude<LessonRole, 'none'>

export const ROLE_STYLE: Record<Colored, { fill: string; text: string; border: string; label: string }> = {
  sujeto: { fill: fn.sujeto.fill, text: fn.sujeto.text, border: fn.sujeto.border, label: 'Sujeto' },
  predicado: { fill: '#ECEAE2', text: '#5f5e5a', border: '#C9C7BD', label: 'Predicado' },
  verbo: { fill: '#FFFFFF', text: '#2c2c2a', border: '#7A7A74', label: 'Verbo' },
  cd: { fill: fn.cd.fill, text: fn.cd.text, border: fn.cd.border, label: 'CD' },
}

export function GroupBox({
  group,
  display,
  onTap,
  shake,
}: {
  group: LGroup
  display: 'plain' | 'box' | 'colored'
  onTap?: () => void
  shake?: boolean
}) {
  if (display === 'plain') return <span className="lplain">{group.text}</span>

  const colored = display === 'colored' && group.role !== 'none'
  const st = colored ? ROLE_STYLE[group.role as Colored] : null

  const inner = {
    className: `box lbox ${onTap ? 'tappable' : ''}`,
    onClick: onTap,
    animate: {
      backgroundColor: st ? st.fill : '#ffffff',
      color: st ? st.text : '#2c2c2a',
      borderColor: st ? st.border : '#D3D1C7',
      x: shake ? [0, -6, 6, -4, 4, 0] : 0,
    },
    transition: { duration: shake ? 0.4 : 0.25 },
    whileHover: onTap ? { scale: 1.04 } : undefined,
    whileTap: onTap ? { scale: 0.96 } : undefined,
  }

  return (
    <motion.div className="lgroup" layout>
      {onTap ? (
        <motion.button type="button" {...inner}>
          {group.text}
        </motion.button>
      ) : (
        <motion.div {...inner}>{group.text}</motion.div>
      )}
      <span className="fnlabel" style={{ color: st ? st.border : 'transparent' }}>
        {st ? st.label : ''}
      </span>
    </motion.div>
  )
}
