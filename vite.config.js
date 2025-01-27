// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // or the plugin for your framework
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(), // Add your existing Vite plugins
    tailwindcss(),
  ],
});
