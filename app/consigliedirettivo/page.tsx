"use client";

import { motion } from "framer-motion";

export default function ConsiglioDirettivoPage() {
  // Separiamo i leader dai consiglieri per un layout più gerarchico e spettacolare
  const leaders = members.filter(m => m.role === "Presidente" || m.role === "Vicepresidente");
  const advisors = members.filter(m => m.role === "Consigliere" || m.role === "Segretario");

  return (
    <div style={styles.page}>
      {/* HERO SECTION - Allineata allo stile immersivo del brand */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={styles.heroTag}>
            <span style={styles.tagIcon}>👥</span>
            Il Team Ufficiale
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} style={styles.heroTitle}>
            Consiglio Direttivo
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} style={styles.heroText}>
            Uomini e donne che guidano la Pro Loco con trasparenza, dedizione e amore incondizionato per Pescina.
          </motion.p>
        </div>
      </section>

      {/* ORGANIGRAMMA PRINCIPALE */}
      <section style={styles.section}>
        
        {/* I vertici dell'associazione (Presidente & Vice) */}
        <div style={styles.leadersGrid}>
          {leaders.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={styles.leaderCard}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(45, 74, 62, 0.12)" }}
            >
              <div style={styles.leaderBadge}>Direttivo</div>
              <h3 style={styles.leaderCardTitle}>{member.name}</h3>
              <p style={styles.cardRoleFeatured}>{member.role}</p>
              {member.bio && <p style={styles.cardText}>{member.bio}</p>}
            </motion.article>
          ))}
        </div>

        {/* Segreteria e Consiglieri */}
        <h2 style={styles.sectionHeading}>I Consiglieri</h2>
        <div style={styles.grid}>
          {advisors.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              style={styles.card}
              whileHover={{ y: -4, boxShadow: "0 15px 35px rgba(150, 115, 70, 0.08)" }}
            >
              <h3 style={styles.cardTitle}>{member.name}</h3>
              <p style={styles.cardRole}>{member.role}</p>
              {member.bio && <p style={styles.cardText}>{member.bio}</p>}
            </motion.article>
          ))}
        </div>

        <div style={styles.divider} />

        {/* Altre Cariche Istituzionali in Grid Composta */}
        <div style={styles.secondaryGrid}>
          
          {/* Referente Comunale */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={styles.subSectionBox}>
            <h2 style={styles.subSectionHeading}>Referente Comunale</h2>
            <article style={styles.minimalCard}>
              <h3 style={styles.cardTitle}>{referente.name}</h3>
              <p style={styles.cardRole}>{referente.role}</p>
            </article>
          </motion.div>

          {/* Collegio dei Probiviri */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={styles.subSectionBox}>
            <h2 style={styles.subSectionHeading}>Consiglio dei Probiviri</h2>
            <div style={styles.miniFlex}>
              {probiviri.map((p) => (
                <article key={p.name} style={styles.minimalCard}>
                  <h3 style={styles.cardTitle}>{p.name}</h3>
                  <p style={styles.cardRole}>{p.role}</p>
                </article>
              ))}
            </div>
          </motion.div>

          {/* Revisori dei Conti */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={styles.subSectionBox}>
            <h2 style={styles.subSectionHeading}>Revisori dei Conti</h2>
            <div style={styles.miniFlex}>
              {revisori.map((r) => (
                <article key={r.name} style={styles.minimalCard}>
                  <h3 style={styles.cardTitle}>{r.name}</h3>
                  <p style={styles.cardRole}>{r.role}</p>
                </article>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}

const members = [
  { name: "Stefano Iulianella", role: "Presidente", bio: "Guida l'associazione con dedizione e visione strategica." },
  { name: "Marco D'Eramo", role: "Vicepresidente", bio: "Coordina gli eventi, la progettazione territoriale e le comunicazioni esterne." },
  { name: "Michela Maggi", role: "Segretario", bio: "Gestione dei flussi associativi, registro dei soci e documentazione ufficiale." },
  { name: "Domenico Morgani", role: "Consigliere", bio: "" },
  { name: "Nicolas Di Michele", role: "Consigliere", bio: "" },
  { name: "Giovanni Mazzocchitti", role: "Consigliere", bio: "" },
  { name: "Alfredo Pagnottaro", role: "Consigliere", bio: "" },
  { name: "Alessandro Clemente Del Rosso", role: "Consigliere", bio: "" },
  { name: "Daniele Taglieri", role: "Consigliere", bio: "" },
  { name: "Ezio Puglielli", role: "Consigliere", bio: "" },
];

const probiviri = [
  { name: "Luca Aschiarolo", role: "Probiviro" },
  { name: "Pierlorenzo Zauri", role: "Probiviro" },
  { name: "Marco Troiani", role: "Probiviro" },
];

const revisori = [
  { name: "Elisa Di Mascio", role: "Revisore dei Conti" },
  { name: "Matteo Panecaldo", role: "Revisore dei Conti" },
];

const referente = { name: "Dorindo Mancinelli", role: "Referente Comunale" };

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
    maxWidth: 750,
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
    background: "rgba(150, 115, 70, 0.85)",
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
    maxWidth: 580,
    fontSize: 17,
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.9)",
  },
  section: {
    padding: "60px 24px 100px",
    maxWidth: 1200,
    margin: "0 auto",
  },
  leadersGrid: {
    display: "grid",
    gap: 32,
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    marginBottom: 60,
  },
  // Card del Presidente / Vice: Più importanti e decorate in Verde Bosco
  leaderCard: {
    background: "linear-gradient(135deg, #fffdf9 0%, #fcf9f2 100%)",
    borderRadius: 24,
    border: "2px solid #2d4a3e",
    padding: "40px 36px",
    position: "relative",
    boxShadow: "0 10px 30px rgba(45, 74, 62, 0.05)",
  },
  leaderBadge: {
    position: "absolute",
    top: 20,
    right: 24,
    background: "#967346",
    color: "white",
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: 999,
    letterSpacing: "0.04em",
  },
  leaderCardTitle: {
    margin: "0 0 6px 0",
    fontSize: 26,
    color: "#2d4a3e",
    fontWeight: 800,
  },
  cardRoleFeatured: {
    margin: "0 0 16px 0",
    fontSize: 13,
    fontWeight: 700,
    color: "#967346",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  sectionHeading: {
    fontSize: 28,
    color: "#2d4a3e",
    fontWeight: 800,
    marginBottom: 32,
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gap: 24,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  // Card standard per i Consiglieri
  card: {
    background: "#fffdf9",
    borderRadius: 20,
    border: "1px solid rgba(150, 115, 70, 0.16)",
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
    padding: "28px 24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 140,
  },
  cardTitle: {
    margin: 0,
    fontSize: 19,
    color: "#2d4a3e",
    fontWeight: 700,
  },
  cardRole: {
    margin: "4px 0 0 0",
    fontSize: 12,
    fontWeight: 600,
    color: "#8a7e6d",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  cardText: {
    margin: "12px 0 0 0",
    fontSize: 14,
    lineHeight: 1.6,
    color: "#5c5346",
  },
  divider: {
    height: 1,
    background: "rgba(150, 115, 70, 0.2)",
    margin: "60px auto",
    maxWidth: "60%",
  },
  // Sezione organizzata per Probiviri, Revisori e Comune
  secondaryGrid: {
    display: "grid",
    gap: 32,
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
  subSectionBox: {
    background: "rgba(150, 115, 70, 0.04)",
    border: "1px dashed rgba(150, 115, 70, 0.25)",
    borderRadius: 24,
    padding: 24,
  },
  subSectionHeading: {
    fontSize: 18,
    color: "#967346",
    fontWeight: 700,
    margin: "0 0 20px 0",
    textAlign: "center",
  },
  miniFlex: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  minimalCard: {
    background: "#fffdf9",
    border: "1px solid rgba(150, 115, 70, 0.15)",
    borderRadius: 14,
    padding: "16px 20px",
    textAlign: "center",
  },
};