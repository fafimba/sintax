import { motion, type PanInfo } from 'framer-motion'

// La ficha-pronombre: la "sonda" que el alumno arrastra sobre un grupo
// para probar si es el complemento directo.
export function PronounChip({
  text,
  onDrop,
}: {
  text: string
  onDrop: (info: PanInfo) => void
}) {
  return (
    <motion.button
      type="button"
      className="pronoun"
      drag
      dragSnapToOrigin
      dragElastic={0.18}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
      whileDrag={{ scale: 1.16, cursor: 'grabbing' }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      onDragEnd={(_, info) => onDrop(info)}
    >
      {text}
    </motion.button>
  )
}
