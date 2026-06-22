import { motion } from 'framer-motion'

// Interruptor segmentado de dos posiciones. La "perilla" de los explorables.
export function SegToggle({
  options,
  value,
  onChange,
  accent = '#185FA5',
}: {
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
  accent?: string
}) {
  return (
    <div className="seg" role="group">
      {options.map((o) => {
        const on = value === o.value
        return (
          <button
            key={o.value}
            type="button"
            className="seg-opt"
            onClick={() => onChange(o.value)}
            aria-pressed={on}
          >
            {on && (
              <motion.span
                layoutId="seg-thumb"
                className="seg-thumb"
                style={{ background: accent }}
                transition={{ type: 'spring', stiffness: 480, damping: 34 }}
              />
            )}
            <span className="seg-label" style={{ color: on ? '#fff' : '#5f5e5a' }}>
              {o.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
