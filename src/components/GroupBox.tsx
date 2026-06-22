import { motion } from 'framer-motion'
import type { LGroup, LessonRole } from '../types'
import { fn, elem } from '../theme'

type Colored = Exclude<LessonRole, 'none'>

export const ROLE_STYLE: Record<Colored, { fill: string; text: string; border: string; label: string }> = {
  sujeto: { fill: fn.sujeto.fill, text: fn.sujeto.text, border: fn.sujeto.border, label: 'Sujeto' },
  predicado: { fill: elem.predicado.fill, text: elem.predicado.text, border: elem.predicado.border, label: 'Predicado' },
  verbo: { fill: elem.verbo.fill, text: elem.verbo.text, border: elem.verbo.border, label: 'Verbo' },
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
  const verbShape = colored && group.role === 'verbo'

  const inner = {
    className: `box lbox ${onTap ? 'tappable' : ''} ${verbShape ? 'shape-verb' : ''}`,
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
