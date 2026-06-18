"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LaNostraStoriaPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page}>
      {/* HERO SECTION - Elegante, calda e immersiva */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={styles.heroTag}>
            <span style={styles.tagIcon}>📖</span>
            La nostra storia
          </motion.div>
          <motion.img
            src="/images/logo-proloco.jpeg"
            alt="Logo Pro Loco Pescina"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            style={styles.heroLogo}
          />
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} style={styles.heroTitle}>
            Il rinascimento giovane della Pro Loco
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} style={styles.heroText}>
            Una nuova generazione che riscopre le radici storiche per proporre un futuro vibrante e dinamico per Pescina.
          </motion.p>
        </div>
      </section>

      {/* SLIDER SECTION - Galleria fotografica storica/istituzionale */}
      <section style={styles.sliderSection}>
        <div style={styles.sliderContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              animate={{ opacity: 0.98, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ ...styles.slideWrapper, position: "relative" }}
            >
              <img src={slides[activeIndex]} alt={`Slide ${activeIndex + 1}`} style={styles.slideImg} />
              
              {/* Overlay Contatti sull'ultima slide, in stile brand */}
              {activeIndex === slides.length - 1 && (
                <div style={styles.emailOverlayBar}>
                  <p style={styles.emailOverlayText}>📧 prolocopescina2026@gmail.com  •  🌐 www.prolocopescina.it</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLLI DELLO SLIDER */}
        <div style={styles.controls}>
          <button onClick={() => setActiveIndex((i) => (i - 1 + slides.length) % slides.length)} style={styles.arrowButton}>‹</button>
          <div style={styles.dotsContainer}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={i === activeIndex ? { ...styles.dot, ...styles.dotActive } : styles.dot}
              />
            ))}
          </div>
          <button onClick={() => setActiveIndex((i) => (i + 1) % slides.length)} style={styles.arrowButton}>›</button>
        </div>
      </section>
    </div>
  );
}

const slides = [
  "/images/Cattura-1.JPG",
  "/images/Cattura-2.JPG",
  "/images/Cattura-3.JPG",
  "/images/Cattura-4.JPG",
  "/images/Cattura-5.JPG",
  "/images/Cattura-6.JPG",
  "/images/Cattura-7.JPG",
  "/images/Cattura-8.JPG",
  "/images/Cattura-9.JPG",
];

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: "#f7f4eb",
    backgroundColor: "#f7f4eb",
    color: "#3a352d",
    minHeight: "100vh",
    width: "100%",
  },
  hero: {
    position: "relative",
    minHeight: "50vh",
    display: "grid",
    placeItems: "center",
    padding: "60px 24px",
    overflow: "hidden",
    background: "#1e332b",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(45, 74, 62, 0.95) 0%, rgba(26, 24, 21, 0.9) 100%)",
    zIndex: 1,
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 700,
    textAlign: "center",
    color: "white",
  },
  heroTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    padding: "10px 20px",
    borderRadius: 999,
    background: "rgba(150, 115, 70, 0.85)", // Ocra/Oro antico
    color: "#ffffff",
    fontWeight: 700,
    letterSpacing: "0.06em",
    fontSize: 12,
    textTransform: "uppercase",
    border: "1px solid rgba(255,255,255,0.15)",
  },
  tagIcon: { fontSize: 14 },
  heroLogo: {
    height: 140,
    maxWidth: "140px",
    objectFit: "contain",
    borderRadius: "50%",
    margin: "15px auto 20px",
    display: "block",
    padding: 10,
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(255,255,255,0.3)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  heroTitle: {
    fontSize: 44,
    lineHeight: 1.15,
    margin: 0,
    letterSpacing: "-0.02em",
    fontWeight: 800,
    textShadow: "0 3px 12px rgba(0,0,0,0.4)",
  },
  heroText: {
    margin: "18px auto 0",
    maxWidth: 580,
    fontSize: 17,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.9)",
    fontWeight: 500,
  },
  sliderSection: {
    padding: "60px 24px 80px",
    maxWidth: 1200,
    margin: "0 auto",
  },
  sliderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "55vh",
    perspective: "1000px",
  },
  slideWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  slideImg: {
    maxWidth: "95%",
    maxHeight: "70vh",
    objectFit: "contain",
    borderRadius: 24,
    boxShadow: "0 20px 50px rgba(45, 74, 62, 0.12)",
    border: "1px solid rgba(150, 115, 70, 0.2)",
  },
  // Box informativo finale rimodulato con i colori del brand
  emailOverlayBar: {
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    background: "linear-gradient(135deg, #2d4a3e 0%, #1a2d25 100%)",
    padding: "16px 32px",
    borderRadius: 999,
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    border: "1px solid rgba(150, 115, 70, 0.3)",
    minWidth: "80%",
    maxWidth: "580px",
    textAlign: "center",
    zIndex: 10,
  },
  emailOverlayText: {
    color: "#f7f4eb",
    fontWeight: 700,
    fontSize: 16,
    margin: 0,
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  controls: {
    display: "flex",
    justifyContent: "between",
    alignItems: "center",
    marginTop: 32,
    padding: "0 20px",
    maxWidth: 600,
    margin: "32px auto 0",
  },
  // Frecce coordinate eleganti e tondeggianti
  arrowButton: {
    all: "unset",
    fontSize: 36,
    color: "#2d4a3e",
    cursor: "pointer",
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#fffdf9",
    boxShadow: "0 6px 15px rgba(150, 115, 70, 0.1)",
    border: "1px solid rgba(150, 115, 70, 0.15)",
    transition: "all 0.2s ease",
  },
  dotsContainer: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "rgba(45, 74, 62, 0.2)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  dotActive: {
    background: "#967346", // Evidenziato in ocra
    transform: "scale(1.25)",
    width: 12,
    height: 12,
  },
};