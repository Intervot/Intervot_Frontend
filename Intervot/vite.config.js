import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@/shared": path.resolve(__dirname, "./src/shared"),
            "@/app": path.resolve(__dirname, "./src/app"),
            "@/web": path.resolve(__dirname, "./src/web"),
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 5173,
        open: true,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom"],
                    utils: ["zustand"],
                },
            },
        },
    },
});
