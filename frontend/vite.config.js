import { defineConfig } from 'vite'
import dotenv from "dotenv";

dotenv.config();
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
});
