import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ZoomItem, LGroup } from '../types'
import { TwoLevelBox } from '../components/GroupBox'
import { Explora } from '../components/Explora'

// Explorable "zoom": la subordinación como caja que se abre y se cierra.
// El CD empieza plegado («eso»); al tocarlo se despliega la oración entera
// que lleva dentro —con su propio verbo y su propio CD—. Reversible.
export function ZoomStage({ item, onTouch }: { item: ZoomItem; onTouch?: () => void }) {
  const [open, setOpen] = useState(false)
  const [touched, setTouched] = useState(false)

  const sGroup: LGroup = { id: 'zs', role: 'sujeto', words: item.s }
  const vGroup: LGroup = { id: 'zv', role: 'verbo', words: item.v }
  const closedCd: LGroup = { id: 'zc', role: 'cd', words: item.collapsed }
  const openCd: LGroup = { id: 'zc', role: 'cd', children: item.expanded }
  const allIds = ['zs', 'zv', 'zc', ...item.expanded.map((g) => g.id)]

  const toggle = () => {
    setOpen((o) => !o)
    setTouched(true)
    onTouch?.()
  }

  return (
    <Explora
      title="Ese CD guarda algo dentro. *Tócalo*."
      note={
        touched
          ? open
            ? item.note
            : 'Y se vuelve a plegar: vista de lejos, es solo una pieza más.'
          : null
      }
    >
      <div className="sentence-area">
        <div className="sentence topalign">
          <TwoLevelBox group={sGroup} reveal={allIds} separated />
          <TwoLevelBox group={vGroup} reveal={allIds} separated />
          <motion.div
            className={`zoom-target ${open ? '' : 'zoom-closed'}`}
            onClick={toggle}
            role="button"
            tabIndex={0}
            aria-expanded={open}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggle()
              }
            }}
            whileTap={{ scale: 0.96 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {open ? (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, scale: 0.72 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.72 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <TwoLevelBox group={openCd} reveal={allIds} separated />
                </motion.div>
              ) : (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <TwoLevelBox group={closedCd} reveal={allIds} separated />
                </motion.div>
              )}
            </AnimatePresence>
            {!open && !touched && <motion.span
              className="zoom-hint"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              toca
            </motion.span>}
          </motion.div>
        </div>
      </div>
    </Explora>
  )
}
