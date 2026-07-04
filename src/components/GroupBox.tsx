import { motion, AnimatePresence } from 'framer-motion'
import type { LGroup, LessonRole } from '../types'
import { fn, elem, clase, claseHidden, fnBrace, fnLabel } from '../theme'

type Colored = Exclude<LessonRole, 'none'>

export const ROLE_STYLE: Record<Colored, { fill: string; text: string; border: string; label: string }> = {
  sujeto: { fill: fn.sujeto.fill, text: fn.sujeto.text, border: fn.sujeto.border, label: 'Sujeto' },
  predicado: { fill: elem.predicado.fill, text: elem.predicado.text, border: elem.predicado.border, label: 'Predicado' },
  verbo: { fill: elem.verbo.fill, text: elem.verbo.text, border: elem.verbo.border, label: 'Verbo' },
  cd: { fill: fn.cd.fill, text: fn.cd.text, border: fn.cd.border, label: 'CD' },
  ci: { fill: fn.ci.fill, text: fn.ci.text, border: fn.ci.border, label: 'CI' },
  atributo: { fill: fn.atributo.fill, text: fn.atributo.text, border: fn.atributo.border, label: 'Atributo' },
  cc: { fill: fn.cc.fill, text: fn.cc.text, border: fn.cc.border, label: 'CC' },
}

function hasRevealed(group: LGroup, reveal: string[]): boolean {
  if (reveal.includes(group.id)) return true
  return !!group.children?.some((c) => hasRevealed(c, reveal))
}

// --- Modelo de DOS NIVELES ---
// La PALABRA se colorea por su CLASE (sustantivo, verbo, adjetivo, adverbio;
// gramaticales en gris). La FUNCIÓN se marca con un CORCHETE neutro + rótulo
// (todas menos el verbo y el pegamento, que van sin corchete). El color y el
// corchete son canales distintos: clase ≠ función, sin pisarse.
//
// En modo "tocar" (onTap), `reveal` acumula lo YA acertado: esos grupos quedan
// coloreados + etiquetados y dejan de ser tocables. Así el análisis se
// construye pieza a pieza sobre la misma frase (reto "analiza").
export function TwoLevelBox({
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
  onTap?: (id: string) => void
  solvedId?: string | null
  wrongId?: string | null
}) {
  const tapMode = !!onTap
  const hasKids = !!group.children?.length
  const bracketed = group.role !== 'verbo' && group.role !== 'none'
  const solved = solvedId === group.id
  const revealed = hasRevealed(group, reveal)
  const active = tapMode ? solved || revealed : revealed
  const tappable = tapMode && !solved && !revealed
  const shake = wrongId === group.id

  const inner = hasKids
    ? group.children!.map((c) => (
        <TwoLevelBox
          key={c.id}
          group={c}
          reveal={reveal}
          separated={separated}
          onTap={onTap}
          solvedId={solvedId}
          wrongId={wrongId}
        />
      ))
    : (group.words ?? []).map((w, i) => (
        <span key={i} className="tl-word" style={{ color: active ? clase[w.clase] : claseHidden }}>
          {w.text}
        </span>
      ))

  const tap = (e: React.MouseEvent) => {
    e.stopPropagation()
    onTap!(group.id)
  }

  // Verbo / pegamento: sin corchete (basta el color de la palabra). En modo
  // "tocar" (p. ej. el primer de clases) la palabra es tocable.
  if (!bracketed) {
    if (tappable)
      return (
        <motion.button
          type="button"
          className="tl-bare tl-tappable"
          data-gid={group.id}
          onClick={tap}
          animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: shake ? 0.4 : 0.2 }}
        >
          {inner}
        </motion.button>
      )
    return (
      <span className="tl-bare" data-gid={group.id}>
        {inner}
      </span>
    )
  }

  // Función con corchete neutro + rótulo.
  const st = ROLE_STYLE[group.role as Colored]
  const showBracket = tapMode || active
  return (
    <motion.div
      data-gid={group.id}
      className={`pred-zone ${tappable ? 'pred-tappable' : ''}`}
      style={{ ['--pred-border' as string]: active ? fnBrace : '#c9c7bd' }}
      onClick={tappable ? tap : undefined}
      animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: shake ? 0.4 : 0.2 }}
    >
      <div className="pred-kids tl-kids">{inner}</div>
      <AnimatePresence>
        {showBracket && (
          <motion.div
            key="bracket"
            className="pred-bracket"
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            style={{ transformOrigin: 'center' }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <motion.span
            key="label"
            className="pred-label"
            style={{ color: fnLabel }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {st.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
