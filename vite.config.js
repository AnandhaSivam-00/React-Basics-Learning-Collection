import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    'process.env.VITE_GOOGLE_GEMINI_MODEL_API': JSON.stringify(process.env.VITE_GOOGLE_GEMINI_MODEL_API),
    'process.env.VITE_HUGGING_FACE_MISTRAL_MODEL_API': JSON.stringify(process.env.VITE_HUGGING_FACE_MISTRAL_MODEL_API)
  }
})
