"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AttoCostitutivoPage() {
  return (
    <div style={styles.page}>
      {/* HERO SECTION - Allineata allo stile caldo e immersivo della Home */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={styles.heroTag}>
            <span style={styles.tagIcon}>📜</span>
            Documenti ufficiali
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} style={styles.heroTitle}>
            Atto Costitutivo & Statuto
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} style={styles.heroText}>
            I documenti istituzionali che definiscono l'identità, gli scopi fondanti e le regole di funzionamento della Pro Loco.
          </motion.p>
        </div>
      </section>

      {/* CONTENUTO PRINCIPALE */}
      <section style={styles.section}>
        <div style={styles.splitGrid}>
          
          {/* Card Atto Costitutivo */}
          <motion.article initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={styles.splitCard}>
            <div style={styles.cardIcon}>📄</div>
            <h2 style={styles.splitTitle}>Atto Costitutivo</h2>
            <p style={styles.splitText}>
              L’atto costitutivo racchiude la nascita della Pro Loco Pescina: data di fondazione, sede legale, patrimonio iniziale e i primi soci fondatori.
            </p>
            <p style={styles.splitText}>
              È il documento formale che sancisce l’istituzione ufficiale dell’associazione sul territorio.
            </p>
            <div style={styles.metaRow}>
              <div style={styles.metaBox}>
                <span style={styles.metaLabel}>Anno di fondazione</span>
                <span style={styles.metaValue}>1977</span>
              </div>
              <div style={styles.metaBox}>
                <span style={styles.metaLabel}>Sede Legale</span>
                <span style={styles.metaValue}>Pescina (AQ)</span>
              </div>
            </div>
            <a href="/attocostitutivo/attocostitutivo.pdf" download style={styles.downloadLink}>
              📥 Scarica l'Atto Costitutivo (PDF)
            </a>
          </motion.article>

          {/* Card Statuto */}
          <motion.article initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={styles.splitCard}>
            <div style={styles.cardIcon}>📋</div>
            <h2 style={styles.splitTitle}>Statuto Regolamentare</h2>
            <p style={styles.splitText}>
              Lo statuto descrive nel dettaglio gli scopi sociali, le norme di comportamento, le cariche associative elettorali e le modalità di partecipazione attiva dei soci.
            </p>
            <p style={styles.splitText}>
              Rappresenta la vera e propria "carta costituzionale" e operativa interna della Pro Loco.
            </p>
            <div style={styles.metaRow}>
              <div style={styles.metaBox}>
                <span style={styles.metaLabel}>Struttura Interna</span>
                <span style={styles.metaValue}>20 Articoli Completi</span>
              </div>
            </div>
            <a href="/statuto/Statuto-Proloco-Pescina.pdf" download style={styles.downloadLink}>
              📥 Scarica lo Statuto Ufficiale (PDF)
            </a>
          </motion.article>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={styles.ctaRow}>
          <div style={styles.ctaIcon}>📁</div>
          <div style={{ flex: 1, minWidth: "260px" }}>
            <h3 style={styles.ctaTitle}>Hai bisogno di altri documenti?</h3>
            <p style={styles.ctaSubText}>Nella sezione principale trovi verbali, bilanci e moduli di iscrizione.</p>
          </div>
          <Link href="/documenti" style={styles.ctaButton}>Vai all'archivio documenti →</Link>
        </motion.div>
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  // Sfondo globale coerente che cancella ogni laterale bianco
  page: {
    background: "#f7f4eb",
    backgroundColor: "#f7f4eb",
    color: "#3a352d",
    minHeight: "100vh",
    width: "100%",
  },
  // Hero elegante con sfumatura che richiama la natura e la storia (Verde Bosco e tonalità scure)
  hero: {
    position: "relative",
    minHeight: "45vh",
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
    maxWidth: 760,
    textAlign: "center",
    color: "white",
  },
  heroTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    padding: "10px 20px",
    borderRadius: 999,
    background: "rgba(150, 115, 70, 0.8)", // Ocra/Oro del brand
    color: "#ffffff",
    fontWeight: 700,
    letterSpacing: "0.06em",
    fontSize: 12,
    textTransform: "uppercase",
    border: "1px solid rgba(255,255,255,0.15)",
  },
  tagIcon: { fontSize: 14 },
  heroTitle: {
    fontSize: 44,
    lineHeight: 1.15,
    margin: 0,
    letterSpacing: "-0.02em",
    fontWeight: 800,
    textShadow: "0 3px 10px rgba(0,0,0,0.3)",
  },
  heroText: {
    margin: "18px auto 0",
    maxWidth: 600,
    fontSize: 17,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.9)",
    fontWeight: 500,
  },
  section: {
    padding: "80px 24px",
    maxWidth: 1200,
    margin: "0 auto",
  },
  splitGrid: {
    display: "grid",
    gap: 32,
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    marginBottom: 50,
  },
  // Card staccate ed eleganti, con lo stesso "galleggiamento" della Home
  splitCard: {
    background: "#fffdf9",
    borderRadius: 24,
    border: "1px solid rgba(150, 115, 70, 0.18)",
    boxShadow: "0 16px 45px rgba(150, 115, 70, 0.05)",
    padding: 36,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  cardIcon: {
    fontSize: 30,
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    background: "rgba(45, 74, 62, 0.1)", // Sfondo verde tenue
    color: "#2d4a3e",
  },
  splitTitle: {
    margin: 0,
    fontSize: 24,
    color: "#2d4a3e", // Verde istituzionale
    fontWeight: 700,
  },
  splitText: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.75,
    color: "#5c5346",
  },
  metaRow: {
    display: "flex",
    gap: 12,
    marginTop: 8,
  },
  metaBox: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: 14,
    background: "#f7f4eb",
    border: "1px solid rgba(150, 115, 70, 0.15)",
  },
  metaLabel: {
    display: "block",
    fontSize: 12,
    color: "#7a6f5e",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    marginBottom: 4,
  },
  metaValue: {
    display: "block",
    fontSize: 15,
    color: "#2d4a3e",
    fontWeight: 700,
  },
  // Pulsante di Download coordinato con gradiente Pro Loco
  downloadLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "14px 22px",
    borderRadius: 999,
    background: "linear-gradient(135deg, #2d4a3e 0%, #967346 100%)",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
    marginTop: 12,
    boxShadow: "0 6px 20px rgba(45, 74, 62, 0.15)",
  },
  ctaRow: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    padding: "30px 36px",
    borderRadius: 24,
    background: "#fffdf9",
    border: "1px solid rgba(150, 115, 70, 0.2)",
    boxShadow: "0 12px 35px rgba(150, 115, 70, 0.04)",
    flexWrap: "wrap",
  },
  ctaIcon: { fontSize: 32 },
  ctaTitle: {
    margin: 0,
    fontSize: 20,
    color: "#2d2821",
    fontWeight: 700,
  },
  ctaSubText: {
    margin: "4px 0 0 0",
    fontSize: 15,
    color: "#5c5346",
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 24px",
    borderRadius: 999,
    background: "rgba(45, 74, 62, 0.08)",
    color: "#2d4a3e",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
    border: "1px solid rgba(45, 74, 62, 0.15)",
  },
};