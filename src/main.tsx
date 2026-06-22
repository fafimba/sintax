import React from 'react'
import ReactDOM from 'react-dom/client'
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
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
