import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins:[react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: '@icons',
        replacement: path.resolve(__dirname, 'src/assets/icons')
      },
      {
        find: '@img',
        replacement: path.resolve(__dirname, 'src/assets/img')
      },
      {
        find: '@layout',
        replacement: path.resolve(__dirname, 'src/components/layout')
      },
      {
        find: '@partials',
        replacement: path.resolve(__dirname, 'src/components/partials')
      },
      {
        find: '@home',
        replacement: path.resolve(__dirname, 'src/pages/Home/index.jsx')
      },
      {
        find: '@login',
        replacement: path.resolve(__dirname, 'src/pages/Login/index.jsx')
      },
      {
        find: '@profile',
        replacement: path.resolve(__dirname, 'src/pages/Profile/index.jsx')
      },
      {
        find: '@error',
        replacement: path.resolve(__dirname, 'src/pages/Error/Error.jsx')
      }
    ]
  }
})