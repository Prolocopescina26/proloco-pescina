"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DiventaSocioPage() {
  return (
    <div style={styles.page}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={styles.heroTag}>
            <span style={styles.tagIcon}>🤝</span>
            Unisciti a noi
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} style={styles.heroTitle}>
            Diventa Socio Pro Loco
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} style={styles.heroText}>
            Entra a far parte attivamente della comunità che dà nuova linfa e risveglia il borgo di Pescina.
          </motion.p>
        </div>
      </section>

      {/* BENTO GRID SECTIONS */}
      <section style={styles.section}>
        <div style={styles.bentoGrid}>
          
          {/* Perché Diventare Socio? */}
          <motion.article 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            style={{ ...styles.bentoCard, gridColumn: "span 2" }}
            whileHover={{ y: -4, boxShadow: "0 15px 35px rgba(150, 115, 70, 0.08)" }}
          >
            <div style={styles.bentoIcon}>🎉</div>
            <h3 style={styles.bentoTitle}>Perché diventare socio?</h3>
            <p style={styles.bentoText}>Partecipare alla vita associativa significa dare forza alle idee, supportare il territorio e usufruire di vantaggi all'interno delle nostre attività.</p>
            <div style={styles.perks}>
              {perks.map((perk) => (
                <div key={perk} style={styles.perkItem}>
                  <span style={styles.perkIcon}>✓</span>
                  <span style={styles.perkText}>{perk}</span>
                </div>
              ))}
            </div>
          </motion.article>

          {/* Quota Annuale */}
          <motion.article 
            initial={{ opacity: 0, scale: 0.96 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            style={{ ...styles.bentoCard, background: "rgba(150, 115, 70, 0.06)", border: "2px solid #967346" }}
            whileHover={{ y: -4, boxShadow: "0 15px 35px rgba(150, 115, 70, 0.12)" }}
          >
            <div style={{ ...styles.bentoIcon, background: "#967346", color: "white" }}>🪙</div>
            <h3 style={styles.bentoTitle}>Quota annuale</h3>
            <div style={styles.priceBox}>
              <span style={styles.priceValue}>10 €</span>
              <span style={styles.priceLabel}>/ anno</span>
            </div>
            <p style={styles.bentoText}>Un piccolo contributo, un immenso valore per sostenere tutti i progetti in programma.</p>
          </motion.article>

          {/* Come aiuti l'associazione */}
          <motion.article 
            initial={{ opacity: 0, scale: 0.96 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            style={{ ...styles.bentoCard, gridColumn: "span 2" }}
            whileHover={{ y: -4, boxShadow: "0 15px 35px rgba(150, 115, 70, 0.08)" }}
          >
            <div style={styles.bentoIcon}>💝</div>
            <h3 style={styles.bentoTitle}>Come aiuti l'associazione</h3>
            <p style={styles.bentoText}>Ogni singola tessera finanzia direttamente il cambiamento contro l'immobilità del territorio:</p>
            <div style={styles.helpList}>
              {helpItems.map((item) => (
                <div key={item} style={styles.helpItem}>
                  <span style={styles.helpIcon}>★</span>
                  <span style={styles.helpText}>{item}</span>
                </div>
              ))}
            </div>
          </motion.article>

          {/* Diventa Volontario */}
          <motion.article 
            initial={{ opacity: 0, scale: 0.96 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            style={styles.bentoCard}
            whileHover={{ y: -4, boxShadow: "0 15px 35px rgba(45, 74, 62, 0.08)" }}
          >
            <div style={styles.bentoIcon}>🌱</div>
            <h3 style={styles.bentoTitle}>Diventa volontario</h3>
            <p style={styles.bentoText}>Vuoi rimboccarti le maniche? Unisciti ai gruppi operativi per eventi e natura.</p>
            <Link href="/contatti" style={styles.bentoLink}>Scopri di più →</Link>
          </motion.article>

          {/* Modulo Adesione */}
          <motion.article 
            initial={{ opacity: 0, scale: 0.96 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            style={styles.bentoCard}
            whileHover={{ y: -4, boxShadow: "0 15px 35px rgba(150, 115, 70, 0.08)" }}
          >
            <div style={styles.bentoIcon}>📋</div>
            <h3 style={styles.bentoTitle}>Modulo adesione</h3>
            <p style={styles.bentoText}>Scarica il documento ufficiale, compilalo in pochi passaggi e portalo con te.</p>
            <a href="/adesioni/modulo-adesione.pdf" download style={styles.bentoLinkAction}>Scarica il PDF ↓</a>
          </motion.article>

          {/* Domande? */}
          <motion.article 
            initial={{ opacity: 0, scale: 0.96 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            style={styles.bentoCard}
            whileHover={{ y: -4, boxShadow: "0 15px 35px rgba(150, 115, 70, 0.08)" }}
          >
            <div style={styles.bentoIcon}>💬</div>
            <h3 style={styles.bentoTitle}>Hai domande?</h3>
            <p style={styles.bentoText}>Hai dubbi sulle modalità di tesseramento o sulle assemblee? Contattaci.</p>
            <Link href="/contatti" style={styles.bentoLink}>Scrivici direttamente →</Link>
          </motion.article>

        </div>
      </section>

      {/* FOOTER CALLOUT / TESTIMONIAL */}
      <section style={styles.testimonialSection}>
        <div style={styles.testimonialContainer}>
          <span style={styles.testimonialQuote}>"Unendo le forze, valorizziamo la nostra storia e costruiamo il domani."</span>
          <span style={styles.testimonialAuthor}> Associazione Pro Loco Pescina</span>
        </div>
      </section>
    </div>
  );
}

const helpItems = [
  "Rilancio ed eventi sul patrimonio letterario (Silone e Mazzarino)",
  "Valorizzazione naturalistica (Fiume Giovenco e sentieri CAI)",
  "Iniziative aggregative e socialità intergenerazionale",
  "Promozione delle eccellenze gastronomiche ed artigianali locali",
];

const perks = [
  "Diritto di voto e partecipazione attiva alle Assemblee",
  "Accesso alla rete e collaborazione con enti e partner",
  "Coinvolgimento in prima persona nei laboratori territoriali",
  "Canale preferenziale e newsletter aggiornata in anteprima",
];

const styles: Record<string, React.CSSProperties> = {
  page: { background: "#f7f4eb", backgroundColor: "#f7f4eb", color: "#3a352d", minHeight: "100vh", width: "100%", overflowX: "hidden" },
  hero: { position: "relative", minHeight: "45vh", display: "grid", placeItems: "center", padding: "60px 24px", overflow: "hidden", background: "#1e332b" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(45, 74, 62, 0.95) 0%, rgba(26, 24, 21, 0.9) 100%)", zIndex: 1 },
  heroContent: { position: "relative", zIndex: 2, maxWidth: 750, textAlign: "center", color: "white" },
  heroTag: { display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "10px 20px", borderRadius: 999, background: "rgba(150, 115, 70, 0.85)", color: "#ffffff", fontWeight: 700, letterSpacing: "0.06em", fontSize: 12, textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.15)" },
  tagIcon: { fontSize: 14 },
  heroTitle: { fontSize: 44, lineHeight: 1.15, margin: 0, letterSpacing: "-0.02em", fontWeight: 800, textShadow: "0 3px 10px rgba(0,0,0,0.3)" },
  heroText: { margin: "18px auto 0", maxWidth: 580, fontSize: 17, lineHeight: 1.65, color: "rgba(255,255,255,0.9)" },
  section: { padding: "60px 24px 80px", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" },
  bentoGrid: { display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", minWidth: 0 },
  bentoCard: { background: "#fffdf9", borderRadius: 24, border: "1px solid rgba(150, 115, 70, 0.16)", boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)", padding: 32, display: "flex", flexDirection: "column", gap: 14, justifyContent: "space-between", minWidth: 0 },
  bentoIcon: { fontSize: 28, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 14, background: "rgba(45, 74, 62, 0.06)", color: "#2d4a3e" },
  bentoTitle: { margin: 0, fontSize: 22, color: "#2d4a3e", fontWeight: 800, letterSpacing: "-0.01em" },
  bentoText: { margin: 0, fontSize: 14, lineHeight: 1.65, color: "#5c5346", wordBreak: "break-word" },
  perks: { display: "flex", flexDirection: "column", gap: 10, marginTop: 6, width: "100%" },
  perkItem: { display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", borderRadius: 12, background: "#fffdf9", border: "1px solid rgba(150, 115, 70, 0.18)", width: "100%", boxSizing: "border-box" },
  perkIcon: { color: "#2d4a3e", fontWeight: 900, fontSize: 14, marginTop: 2, flexShrink: 0 },
  perkText: { fontSize: 13, color: "#4a4235", fontWeight: 500, wordBreak: "break-word" },
  priceBox: { display: "flex", alignItems: "baseline", gap: 8, margin: "4px 0" },
  priceValue: { fontSize: 42, fontWeight: 800, color: "#2d4a3e", letterSpacing: "-0.02em" },
  priceLabel: { fontSize: 14, color: "#5c5346", fontWeight: 600 },
  bentoLink: { display: "inline-flex", alignItems: "center", color: "#967346", fontWeight: 700, textDecoration: "none", fontSize: 14, marginTop: 4 },
  bentoLinkAction: { display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#2d4a3e", color: "white", fontWeight: 700, textDecoration: "none", fontSize: 13, padding: "12px 20px", borderRadius: 12, textAlign: "center" as const, marginTop: 4 },
  helpList: { display: "flex", flexDirection: "column", gap: 10, marginTop: 4, width: "100%" },
  helpItem: { display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", borderRadius: 12, background: "rgba(45, 74, 62, 0.03)", border: "1px dashed rgba(45, 74, 62, 0.2)", width: "100%", boxSizing: "border-box" },
  helpIcon: { color: "#967346", fontSize: 14, marginTop: 2, flexShrink: 0 },
  helpText: { fontSize: 13, color: "#4a4235", fontWeight: 500, wordBreak: "break-word" },
  testimonialSection: { padding: "60px 24px", background: "rgba(150, 115, 70, 0.06)", textAlign: "center", borderTop: "1px solid rgba(150, 115, 70, 0.1)" },
  testimonialContainer: { maxWidth: 700, margin: "0 auto" },
  testimonialQuote: { fontSize: 20, fontStyle: "italic", color: "#2d4a3e", fontWeight: 600, display: "block", marginBottom: 10, wordBreak: "break-word" },
  testimonialAuthor: { fontSize: 14, color: "#8a7e6d", fontWeight: 500 },
};