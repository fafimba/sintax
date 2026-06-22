import { useState } from 'react'
import { Home, type HomeTarget } from './components/Home'
import { LessonPlayer } from './components/LessonPlayer'
import { LESSON1 } from './data/lesson1'
import { CDActivity } from './activities/CDActivity'
import { NucleoActivity } from './activities/NucleoActivity'
import { SujetoActivity } from './activities/SujetoActivity'
import { ConcordanciaActivity } from './activities/ConcordanciaActivity'
import { VozActivity } from './activities/VozActivity'

type View = 'lesson' | 'menu' | HomeTarget

export default function App() {
  // Arranca en el camino guiado, no en el menú.
  const [view, setView] = useState<View>('lesson')
  const menu = () => setView('menu')

  return (
    <div className="screen">
      {view === 'lesson' && <LessonPlayer lesson={LESSON1} onExit={menu} />}
      {view === 'menu' && <Home onPick={setView} />}
      {view === 'concordancia' && <ConcordanciaActivity onBack={menu} />}
      {view === 'voz' && <VozActivity onBack={menu} />}
      {view === 'nucleo' && <NucleoActivity onBack={menu} />}
      {view === 'sujeto' && <SujetoActivity onBack={menu} />}
      {view === 'cd' && <CDActivity onBack={menu} />}
    </div>
  )
}
