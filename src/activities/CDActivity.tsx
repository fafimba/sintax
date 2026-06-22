import { useState } from 'react'
import { SENTENCES } from '../data/sentences'
import { SentenceStage } from '../components/SentenceStage'
import { TopBar } from '../components/TopBar'
import { Done } from '../components/Done'

export function CDActivity({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0)
  const sentence = SENTENCES[idx]

  return (
    <>
      <TopBar onBack={onBack} progress={idx / SENTENCES.length} />
      {sentence ? (
        <SentenceStage key={sentence.id} sentence={sentence} onNext={() => setIdx((i) => i + 1)} />
      ) : (
        <Done
          total={SENTENCES.length}
          label="oraciones"
          onRestart={() => setIdx(0)}
          onBack={onBack}
        />
      )}
    </>
  )
}
