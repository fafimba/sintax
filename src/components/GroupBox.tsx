import { motion, AnimatePresence } from 'framer-motion'
import type { LGroup, LessonRole } from '../types'
import { fn, elem } from '../theme'

type Colored = Exclude<LessonRole, 'none'>

export const ROLE_STYLE: Record<Colored, { fill: string; text: string; border: string; label: string }> = {
  sujeto: { fill: fn.sujeto.fill, text: fn.sujeto.text, border: fn.sujeto.border, label: 'Sujeto' },
  predicado: { fill: elem.predicado.fill, text: elem.predicado.text, border: elem.predicado.border, label: 'Predicado' },
  verbo: { fill: elem.verbo.fill, text: elem.verbo.text, border: elem.verbo.border, label: 'Verbo' },
  cd: { fill: fn.cd.fill, text: fn.cd.text, border: fn.cd.border, label: 'CD' },
  ci: { fill: fn.ci.fill, text: fn.ci.text, border: fn.ci.border, label: 'CI' },
}

// Forma por tipo de elemento (solo al revelarse).
const SHAPE: Record<Colored, string> = {
  sujeto: 'shape-sujeto', // píldora: el tema, estable
  predicado: 'shape-verb', // pico a la derecha: lado de la acción
  verbo: 'shape-verb', // pico a la derecha: la acción
  cd: 'shape-cd', // muesca a la izquierda: recibe la acción
  ci: 'shape-ci', // muescas a ambos lados: destinatario (recibe y "a quién")
}

// display:
//   plain   -> texto suelto (sin caja)
//   flush   -> caja invisible (la frase se lee continua, antes del "corte")
//   box     -> caja neutra (separada, sin función todavía)
//   colored -> caja con color + forma + etiqueta de su función
export function GroupBox({
  group,
  display,
  onTap,
  shake,
}: {
  group: LGroup
  display: 'plain' | 'flush' | 'box' | 'colored'
  onTap?: () => void
  shake?: boolean
}) {
  if (display === 'plain') return <span className="lplain">{group.text}</span>

  const colored = display === 'colored' && group.role !== 'none'
  const flush = display === 'flush'
  const st = colored ? ROLE_STYLE[group.role as Colored] : null
  const shapeClass = colored ? SHAPE[group.role as Colored] : ''

  const bg = st ? st.fill : flush ? 'rgba(255,255,255,0)' : '#ffffff'
  const fg = st ? st.text : '#2c2c2a'
  const bd = st ? st.border : flush ? 'rgba(0,0,0,0)' : '#d3d1c7'

  const inner = {
    'data-gid': group.id,
    className: `box lbox ${onTap ? 'tappable' : ''} ${shapeClass}`,
    onClick: onTap,
    animate: { backgroundColor: bg, color: fg, borderColor: bd, x: shake ? [0, -6, 6, -4, 4, 0] : 0 },
    transition: { duration: shake ? 0.4 : 0.3 },
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

function hasRevealed(group: LGroup, reveal: string[]): boolean {
  if (reveal.includes(group.id)) return true
  return !!group.children?.some((c) => hasRevealed(c, reveal))
}

// Estandarización del estilo:
//   Constituyentes de cláusula (Sujeto, Predicado, subordinadas) -> CORCHETE.
//   Hojas de función (Verbo, CD, nexo) -> ficha con forma/color.
// El corchete aparece cuando el constituyente (o algún hijo) se ha revelado.
export function ConstituentBox({
  group,
  reveal,
  separated,
  onTap,
  solvedId,
  wrongId,
}: {
  group: LGroup
  reveal: string[]
  separated: boolean
  onTap?: (id: string) => void // modo "tocar" (mini-puzle)
  solvedId?: string | null
  wrongId?: string | null
}) {
  const isClause = group.role === 'sujeto' || group.role === 'predicado'
  const hasKids = !!group.children?.length
  const tapMode = !!onTap

  // Hoja de función -> ficha.
  if (!hasKids && !isClause) {
    const solved = solvedId === group.id
    const display = tapMode
      ? solved
        ? 'colored'
        : group.role === 'none'
          ? 'plain'
          : 'box'
      : reveal.includes(group.id)
        ? 'colored'
        : group.role === 'none'
          ? 'plain'
          : separated
            ? 'box'
            : 'flush'
    return (
      <GroupBox
        group={group}
        display={display}
        onTap={tapMode && group.role !== 'none' ? () => onTap!(group.id) : undefined}
        shake={wrongId === group.id}
      />
    )
  }

  // Constituyente con corchete. Color = función del constituyente (sin color nuevo).
  const st = ROLE_STYLE[group.role as Colored]
  const solved = solvedId === group.id
  // En modo tocar el corchete se ve siempre (neutro) como pista de "esto es un
  // constituyente"; se colorea + etiqueta al acertar.
  const open = tapMode ? true : hasRevealed(group, reveal)
  const colored = tapMode ? solved : open
  const border = colored ? st.border : '#c9c7bd'
  const shake = wrongId === group.id

  return (
    <motion.div
      className={`pred-zone ${tapMode && !solved ? 'pred-tappable' : ''}`}
      style={{ ['--pred-border' as string]: border }}
      onClick={tapMode && !solved ? () => onTap!(group.id) : undefined}
      animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: shake ? 0.4 : 0.2 }}
    >
      <motion.div className="pred-kids" layout animate={{ gap: open ? 12 : 6 }} transition={{ duration: 0.4 }}>
        {hasKids ? (
          group.children!.map((child) => (
            <ConstituentBox
              key={child.id}
              group={child}
              reveal={reveal}
              separated={separated}
              onTap={onTap}
              solvedId={solvedId}
              wrongId={wrongId}
            />
          ))
        ) : (
          <span className="bracket-words">{group.text}</span>
        )}
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="bracket"
            className="pred-bracket"
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26, delay: tapMode ? 0 : 0.12 }}
            style={{ transformOrigin: 'center' }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {colored && (
          <motion.span
            key="label"
            className="pred-label"
            style={{ color: st.border }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: tapMode ? 0 : 0.2 }}
          >
            {st.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
