import { AnimatePresence, motion } from 'framer-motion'

// Texto que "muta" al cambiar (singular <-> plural): la palabra nueva
// entra deslizando mientras la anterior sale. Es el corazón visual de
// la concordancia: ver el verbo cambiar a la vez que el sujeto.
export function MorphText({ text }: { text: string }) {
  return (
    <span className="morph">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0, position: 'absolute' }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
