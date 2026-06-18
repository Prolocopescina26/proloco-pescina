import type { NextConfig } from "next";

// Importa il PWA
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  // Aggiungi queste due righe per zittire l'errore di Turbopack
  webpack: (config) => config,
  turbopack: {}, 
};

export default withPWA(nextConfig);