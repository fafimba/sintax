import { useState } from 'react'
import { Home, type ActivityId } from './components/Home'
import { CDActivity } from './activities/CDActivity'
import { NucleoActivity } from './activities/NucleoActivity'
import { SujetoActivity } from './activities/SujetoActivity'

type View = 'home' | ActivityId

export default function App() {
  const [view, setView] = useState<View>('home')
  const back = () => setView('home')

  return (
    <div className="screen">
      {view === 'home' && <Home onPick={setView} />}
      {view === 'nucleo' && <NucleoActivity onBack={back} />}
      {view === 'sujeto' && <SujetoActivity onBack={back} />}
      {view === 'cd' && <CDActivity onBack={back} />}
    </div>
  )
}
