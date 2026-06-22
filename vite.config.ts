import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En producción se sirve desde https://<usuario>.github.io/sintax/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/sintax/' : '/',
  plugins: [react()],
}))
