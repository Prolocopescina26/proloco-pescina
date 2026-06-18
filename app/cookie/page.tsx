"use client";

import React from "react";

export default function CookiePage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <span style={styles.overline}>Informativa Trasparente</span>
        <h1 style={styles.title}>Cookie Policy</h1>
        <p style={styles.intro}>
          Informativa estesa sull&apos;uso dei cookie e altri strumenti di tracciamento in conformità con 
          le Linee Guida del Garante per la Protezione dei Dati Personali e con la Direttiva ePrivacy.
        </p>

        <hr style={styles.divider} />

        {/* 1. Cosa sono i Cookie */}
        <section style={styles.section}>
          <h2 style={styles.heading}>1. Cosa sono i Cookie</h2>
          <p style={styles.text}>
            I cookie sono piccoli file di testo che i siti visitati dall&apos;utente inviano e registrano sul suo computer 
            o dispositivo mobile, per essere poi ritrasmessi agli stessi siti alla visita successiva. Essi servono a diverse 
            finalità, come facilitare la navigazione, ricordare le preferenze dell&apos;utente o analizzare statisticamente 
            l&apos;uso del portale.
          </p>
        </section>

        {/* 2. Tipologia di Cookie Utilizzati */}
        <section style={{ ...styles.section, ...styles.highlightSection }}>
          <h2 style={styles.heading}>2. Cookie Tecnici e Necessari (Sito Web Sicuro)</h2>
          <p style={styles.text}>
            Questo sito web utilizza <strong>esclusivamente cookie di natura tecnica e di sessione</strong>, strettamente necessari 
            al corretto e sicuro funzionamento del portale. Non vengono impiegati cookie di profilazione o tracciamento pubblicitario di prima parte.
          </p>
          <div style={styles.infoBox}>
            <strong>Nessun Banner Necessario:</strong> Ai sensi del provvedimento del Garante per la Privacy (Registro dei provvedimenti n. 231 del 10 giugno 2021), 
            l&apos;utilizzo di cookie puramente tecnici e statistici aggregati non richiede il consenso preventivo dell&apos;utente tramite banner, 
            ma è soggetto unicamente all&apos;obbligo di rilascio della presente informativa.
          </div>
        </section>

        {/* 3. Cookie di Terze Parti e Social Network */}
        <section style={styles.section}>
          <h2 style={styles.heading}>3. Collegamenti a Piattaforme Esterne</h2>
          <p style={styles.text}>
            Durante la navigazione potresti incontrare collegamenti a piattaforme terze, quali ad esempio i nostri canali social ufficiali 
            (Instagram e Facebook). Desideriamo precisare che la semplice presenza di questi collegamenti ipertestuali non comporta l&apos;installazione 
            di cookie di terze parti sul tuo browser dal nostro portale.
          </p>
          <blockquote style={styles.warningBlock}>
            Nel momento in cui decidi di cliccare sul collegamento e atterrare sui suddetti portali esterni, le relative terze parti potrebbero installare 
            i propri cookie di tracciamento e profilazione. Per maggiori informazioni, ti invitiamo a prendere visione delle rispettive informative privacy:
            <ul style={styles.warningList}>
              <li><a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noopener noreferrer" style={styles.warningLink}>Meta / Facebook Cookie Policy</a></li>
              <li><a href="https://help.instagram.com/1896641480634370" target="_blank" rel="noopener noreferrer" style={styles.warningLink}>Instagram Cookie Policy</a></li>
            </ul>
          </blockquote>
        </section>

        {/* 4. Come gestire o disattivare i cookie tramite Browser */}
        <section style={styles.section}>
          <h2 style={styles.heading}>4. Come controllare i Cookie tramite Browser</h2>
          <p style={styles.text}>
            L&apos;utente può gestire le preferenze relative ai cookie direttamente all&apos;interno del proprio browser web, impedendone 
            l&apos;installazione o cancellando quelli già registrati. Disabilitando i cookie tecnici necessari, tuttavia, alcune funzionalità 
            del sito potrebbero non operare in modo corretto. Le istruzioni per configurare o disattivare i cookie sui browser più comuni sono disponibili qui:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={styles.inlineLink}>Google Chrome</a></li>
            <li style={styles.listItem}><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={styles.inlineLink}>Apple Safari</a></li>
            <li style={styles.listItem}><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noopener noreferrer" style={styles.inlineLink}>Mozilla Firefox</a></li>
            <li style={styles.listItem}><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-e-gestire-i-cookie-in-microsoft-edge-168dab11-0753-243d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" style={styles.inlineLink}>Microsoft Edge</a></li>
          </ul>
        </section>

        <p style={styles.updated}>Ultimo aggiornamento formale: Giugno 2026</p>
      </div>
    </div>
  );
}

// ========== STYLES ==========

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: "#f7f4eb",
    backgroundColor: "#f7f4eb",
    minHeight: "100vh",
    padding: "60px 24px",
    display: "grid",
    placeItems: "center",
  },
  container: {
    maxWidth: 800,
    width: "100%",
    background: "#fffdf9",
    padding: "48px 40px",
    borderRadius: 24,
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.04)",
    border: "1px solid rgba(150, 115, 70, 0.16)",
  },
  overline: {
    display: "inline-flex",
    marginBottom: 12,
    padding: "4px 12px",
    borderRadius: 999,
    background: "rgba(150, 115, 70, 0.08)",
    border: "1px solid rgba(150, 115, 70, 0.15)",
    color: "#967346",
    fontWeight: 700,
    letterSpacing: "0.06em",
    fontSize: 11,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 38,
    fontWeight: 800,
    color: "#2d4a3e",
    margin: "0 0 16px 0",
    letterSpacing: "-0.02em",
  },
  intro: {
    fontSize: 16,
    lineHeight: 1.6,
    color: "#5c5346",
    margin: "0 0 24px 0",
  },
  divider: {
    border: "none",
    borderTop: "1px solid rgba(150, 115, 70, 0.15)",
    margin: "24px 0",
  },
  section: {
    marginBottom: 28,
  },
  highlightSection: {
    padding: "20px",
    background: "rgba(150, 115, 70, 0.03)",
    borderRadius: 16,
    borderLeft: "4px solid #967346",
  },
  heading: {
    fontSize: 18,
    fontWeight: 800,
    color: "#2d4a3e",
    marginTop: 0,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: "0.02em",
  },
  text: {
    fontSize: 15,
    lineHeight: 1.7,
    color: "#3a352d",
    margin: 0,
  },
  infoBox: {
    marginTop: 14,
    fontSize: 13,
    lineHeight: 1.6,
    color: "#2d4a3e",
    background: "rgba(45, 74, 62, 0.05)",
    border: "1px solid rgba(45, 74, 62, 0.12)",
    padding: "12px 16px",
    borderRadius: 12,
  },
  list: {
    margin: "12px 0 0 0",
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#3a352d",
  },
  warningBlock: {
    margin: "14px 0 0 0",
    padding: "14px 18px",
    background: "#fffdf9",
    border: "1px solid rgba(150, 115, 70, 0.2)",
    borderRadius: 12,
    fontSize: 14,
    lineHeight: 1.6,
    color: "#5c5346",
  },
  warningList: {
    margin: "8px 0 0 0",
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  warningLink: {
    color: "#967346",
    fontWeight: 700,
    textDecoration: "underline",
  },
  inlineLink: {
    color: "#2d4a3e",
    fontWeight: 700,
    textDecoration: "underline",
    textDecorationColor: "rgba(45, 74, 62, 0.3)",
  },
  updated: {
    fontSize: 12,
    fontWeight: 600,
    color: "#967346",
    marginTop: 36,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderTop: "1px solid rgba(150, 115, 70, 0.1)",
    paddingTop: 16,
  },
};