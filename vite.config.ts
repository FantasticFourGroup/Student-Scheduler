/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    // ...
  },
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
  ],
});
