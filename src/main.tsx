import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Si algo lanza, mostramos un mensaje en vez de dejar la pantalla en blanco.
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    console.error(error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <main className="error-screen" role="alert">
          <div className="error-card">
            <p className="eyebrow">SINTAX</p>
            <h1>Esta vez, la frase se ha atascado.</h1>
            <p>
              Recarga la página para volver al ejemplo. Tu progreso guardado se
              conserva.
            </p>
            <button
              className="primary-button"
              onClick={() => window.location.reload()}
            >
              Volver a intentarlo
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
