import { useState } from 'react'
import { Home, type HomeTarget } from './components/Home'
import { MapScreen } from './components/MapScreen'
import { LessonPlayer } from './components/LessonPlayer'
import { CHAPTERS } from './data/chapters'
import { CDActivity } from './activities/CDActivity'
import { NucleoActivity } from './activities/NucleoActivity'
import { SujetoActivity } from './activities/SujetoActivity'
import { ConcordanciaActivity } from './activities/ConcordanciaActivity'
import { VozActivity } from './activities/VozActivity'

const STORE_KEY = 'sintax_progress_v1'

function loadCompleted(): string[] {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

type View = 'map' | 'menu' | 'chapter' | HomeTarget

export default function App() {
  const [completed, setCompleted] = useState<string[]>(loadCompleted)
  const [view, setView] = useState<View>('map')
  const [chapterId, setChapterId] = useState<string>(CHAPTERS[0].id)

  const chapter = CHAPTERS.find((c) => c.id === chapterId) ?? CHAPTERS[0]

  const playChapter = (id: string) => {
    setChapterId(id)
    setView('chapter')
  }

  const completeChapter = (id: string) => {
    setCompleted((prev) => {
      const next = prev.includes(id) ? prev : [...prev, id]
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
    setView('map')
  }

  return (
    <div className="screen">
      {view === 'map' && (
        <MapScreen
          chapters={CHAPTERS}
          completed={completed}
          onPlay={playChapter}
          onFree={() => setView('menu')}
        />
      )}
      {view === 'chapter' && (
        <LessonPlayer
          lesson={chapter.lesson}
          onBack={() => setView('map')}
          onComplete={() => completeChapter(chapter.id)}
        />
      )}
      {view === 'menu' && (
        <Home onPick={(id) => (id === 'lesson' ? setView('map') : setView(id))} />
      )}
      {view === 'concordancia' && <ConcordanciaActivity onBack={() => setView('menu')} />}
      {view === 'voz' && <VozActivity onBack={() => setView('menu')} />}
      {view === 'nucleo' && <NucleoActivity onBack={() => setView('menu')} />}
      {view === 'sujeto' && <SujetoActivity onBack={() => setView('menu')} />}
      {view === 'cd' && <CDActivity onBack={() => setView('menu')} />}
    </div>
  )
}
