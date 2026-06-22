import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'
import './index.css'

// Si algo lanza, mostramos un mensaje en vez de dejar la pantalla en blanco.
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: unknown) {
    console.error(error)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="screen">
          <div className="done-screen">
            <h1>Vaya, algo se atascó.</h1>
            <p>Recarga para seguir.</p>
            <button className="btn" onClick={() => window.location.reload()}>
              Recargar
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* reducedMotion="user": respeta "Reducir movimiento" del sistema. Framer
        desactiva animaciones de transform y layout (deslizar, escalar, temblar)
        y mantiene las de opacidad/color, que no marean. El estado final —y el
        significado que codifica— se conserva. */}
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </MotionConfig>
  </React.StrictMode>,
)
