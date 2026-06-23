import type { ReactNode } from 'react'
import type { LessonRole } from '../types'
import { ROLE_STYLE } from './GroupBox'

const ROLE_KEYS = ['sujeto', 'predicado', 'verbo', 'cd', 'ci', 'atributo', 'cc'] as const

// Marca ligera para enunciados y explicaciones:
//   *texto*  -> negrita (palabra clave)
//   [sujeto] -> chip con el color del elemento (enunciado visual)
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const re = /\*([^*]+)\*|\[([a-z]+)\]/g
  let last = 0
  let k = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      parts.push(<b key={k++}>{m[1]}</b>)
    } else if (m[2] && (ROLE_KEYS as readonly string[]).includes(m[2])) {
      // Modelo de dos niveles: la FUNCIÓN se nombra con un chip NEUTRO (como el
      // corchete gris). El color queda reservado para la clase de palabra.
      const st = ROLE_STYLE[m[2] as Exclude<LessonRole, 'none'>]
      parts.push(
        <span key={k++} className="rt-chip" style={{ background: '#ECEAE2', color: '#54534d' }}>
          {st.label}
        </span>,
      )
    } else {
      parts.push(m[0])
    }
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
