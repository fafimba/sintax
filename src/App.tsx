import { useState, useEffect } from 'react'
import { MapScreen } from './components/MapScreen'
import { LessonPlayer } from './components/LessonPlayer'
import { CHAPTERS } from './data/chapters'

const STORE_KEY = 'sintax_progress_v2'

interface Progress {
  completed: string[]
  chapterId: string
  beat: number
}

function loadProgress(): Progress | null {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    return raw ? (JSON.parse(raw) as Progress) : null
  } catch {
    return null
  }
}

function firstIncomplete(completed: string[]): string {
  const ch = CHAPTERS.find((c) => !completed.includes(c.id))
  return (ch ?? CHAPTERS[CHAPTERS.length - 1]).id
}

export default function App() {
  const saved = loadProgress()
  const [completed, setCompleted] = useState<string[]>(saved?.completed ?? [])
  const [chapterId, setChapterId] = useState<string>(
    saved?.chapterId ?? firstIncomplete(saved?.completed ?? []),
  )
  const [beat, setBeat] = useState<number>(saved?.beat ?? 0)
  const [justCompleted, setJustCompleted] = useState<string | null>(null)
  // Arranca SIEMPRE en el contenido (donde lo dejaste), nunca en el mapa.
  const [view, setView] = useState<'chapter' | 'map'>('chapter')

  // Persiste el progreso (capítulo + paso) cada vez que cambia.
  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ completed, chapterId, beat }))
    } catch {
      /* ignore */
    }
  }, [completed, chapterId, beat])

  const chapter = CHAPTERS.find((c) => c.id === chapterId) ?? CHAPTERS[0]

  const playChapter = (id: string) => {
    setJustCompleted(null)
    setChapterId(id)
    setBeat(0)
    setView('chapter')
  }

  const completeChapter = (id: string) => {
    setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))
    const idx = CHAPTERS.findIndex((c) => c.id === id)
    const next = CHAPTERS[idx + 1]
    if (next) {
      setChapterId(next.id)
      setBeat(0)
    }
    setJustCompleted(id)
    setView('map')
  }

  return (
    <div className="screen">
      {view === 'chapter' && (
        <LessonPlayer
          key={chapterId}
          lesson={chapter.lesson}
          initialBeat={beat}
          onBeat={setBeat}
          onBack={() => setView('map')}
          onComplete={() => completeChapter(chapter.id)}
        />
      )}
      {view === 'map' && (
        <MapScreen
          chapters={CHAPTERS}
          completed={completed}
          justCompleted={justCompleted}
          onPlay={playChapter}
        />
      )}
    </div>
  )
}
