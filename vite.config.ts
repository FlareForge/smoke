import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    base: "./",
    plugins: [react()],
    publicDir: './Assets/exports',
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "app-front/index.html"),
                overlay: path.resolve(__dirname, "app-front/overlay.html"),
            },
            output: {
                dir: path.resolve(__dirname, "app-front/.build"),
                entryFileNames: "[name].js",
            },
        },
    },
    root: "app-front",
    resolve: {
        alias: {
            "@Components": path.resolve(__dirname, "app-front/Components"),
            "@Services": path.resolve(__dirname, "app-back/Services"),
            "@Pages": path.resolve(__dirname, "app-front/Pages"),
        },
    },
});
