"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <span style={styles.overline}>Informativa Legale</span>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.intro}>
          Informativa sul trattamento dei dati personali ai sensi dell&apos;Art. 13 del Regolamento UE 2016/679 (GDPR) 
          per i visitatori del sito della Pro Loco Pescina.
        </p>
        
        <hr style={styles.divider} />

        {/* 1. Titolare del Trattamento */}
        <section style={styles.section}>
          <h2 style={styles.heading}>1. Titolare del Trattamento</h2>
          <p style={styles.text}>
            Il Titolare del trattamento è l&apos;Associazione <strong>Pro Loco Pescina</strong>, con sede legale in 
            Via S. Rinaldi, 1 - 67057 Pescina (AQ), C.F.: 81006210660. È possibile contattare il Titolare 
            scrivendo all&apos;indirizzo email dedicato:{" "}
            <a href="mailto:prolocopescina2026@gmail.com" style={styles.link}>
              prolocopescina2026@gmail.com
            </a>.
          </p>
        </section>

        {/* 2. Tipologia di Dati Raccolti */}
        <section style={styles.section}>
          <h2 style={styles.heading}>2. Tipologia di Dati Raccolti</h2>
          <p style={styles.text}>
            Il sito raccoglie unicamente i dati strettamente necessari all&apos;esecuzione dei servizi richiesti dall&apos;utente:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}><strong>Dati forniti volontariamente:</strong> Nome, indirizzo email ed eventuali ulteriori dati inseriti nei moduli di contatto (es. pagina &quot;Valutaci&quot; o richieste informative).</li>
            <li style={styles.listItem}><strong>Dati di navigazione:</strong> Dati tecnici impliciti nell&apos;uso dei protocolli di comunicazione di Internet (indirizzi IP, log di sistema) utilizzati al solo fine di garantire la sicurezza informatica del portale.</li>
          </ul>
        </section>

        {/* 3. Finalità e Base Giuridica */}
        <section style={styles.section}>
          <h2 style={styles.heading}>3. Finalità e Base Giuridica del Trattamento</h2>
          <p style={styles.text}>
            I dati personali sono trattati esclusivamente per le seguenti finalità:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Rispondere a richieste di contatto, segnalazioni o feedback inviati dall&apos;utente (Base giuridica: esecuzione di misure precontrattuali o contrattuali).</li>
            <li style={styles.listItem}>Garantire il corretto funzionamento del sito e prevenire attività fraudolente o dannose (Base giuridica: legittimo interesse del Titolare).</li>
          </ul>
        </section>

        {/* 4. Link a Siti Terzi e Social Network */}
        <section style={{ ...styles.section, ...styles.highlightSection }}>
          <h2 style={styles.heading}>4. Collegamenti a Siti Terzi (Social Network e Mappe)</h2>
          <p style={styles.text}>
            Il presente sito contiene collegamenti ipertestuali (link) a piattaforme esterne di terze parti, incluse, 
            a titolo esemplificativo, le pagine social ufficiali (Facebook, Instagram). 
          </p>
          <blockquote style={styles.warningBlock}>
            <strong>Nota di Esclusione di Responsabilità:</strong> Il Titolare non esercita alcun controllo e non è 
            responsabile per i trattamenti di dati personali effettuati da tali siti web terzi. Una volta abbandonato 
            questo portale tramite link, l&apos;utente è invitato a consultare autonomamente le informative privacy e le 
            policy sui cookie di ciascuna piattaforma esterna per comprenderne le modalità di trattamento.
          </blockquote>
        </section>

        {/* 5. Conservazione e Sicurezza */}
        <section style={styles.section}>
          <h2 style={styles.heading}>5. Periodo di Conservazione dei Dati</h2>
          <p style={styles.text}>
            I dati raccolti saranno conservati per il tempo strettamente necessario a soddisfare le richieste dell&apos;interessato 
            o per adempiere a specifici obblighi di legge. I dati legati ai moduli di feedback non verranno ceduti a terzi 
            e saranno gestiti internamente in forma protetta.
          </p>
        </section>

        {/* 6. Diritti dell'Interessato */}
        <section style={styles.section}>
          <h2 style={styles.heading}>6. Diritti dell&apos;Interessato (Artt. 15-22 GDPR)</h2>
          <p style={styles.text}>
            In ogni momento, gli utenti hanno il diritto di esercitare le facoltà previste dal Regolamento Europeo. In particolare, 
            è possibile richiedere l&apos;accesso ai dati, la rettifica, la cancellazione (diritto all&apos;oblio), la limitazione del trattamento 
            o l&apos;opposizione allo stesso, inviando una comunicazione scritta a:{" "}
            <a href="mailto:prolocopescina2026@gmail.com" style={styles.link}>
              prolocopescina2026@gmail.com
            </a>. Gli utenti hanno altresì il diritto di proporre reclamo all&apos;Autorità Garante per la Protezione dei Dati Personali.
          </p>
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
    border: "1px solid rgba(184, 92, 55, 0.25)",
    borderRadius: 12,
    fontSize: 14,
    lineHeight: 1.6,
    color: "#b85c37",
  },
  link: {
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