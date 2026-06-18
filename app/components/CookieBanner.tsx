"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già effettuato una scelta
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "granted");
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "denied");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={styles.bannerContainer}>
      <div style={styles.bannerInner}>
        <div style={styles.textWrapper}>
          <h4 style={styles.heading}>Informativa sull&apos;uso dei cookie</h4>
          <p style={styles.text}>
            La Pro Loco Pescina utilizza cookie tecnici per il corretto funzionamento del sito e, previo tuo consenso, 
            cookie di terze parti per migliorare l&apos;esperienza utente e l&apos;interazione con i social network.
            <br /><br />
            Cliccando su <strong>&quot;Accetta tutto&quot;</strong> acconsenti all&apos;uso di tutti i cookie. 
            Cliccando su <strong>&quot;Rifiuta&quot;</strong>, continuerai la navigazione 
            utilizzando solo i cookie tecnici necessari. Puoi modificare le tue preferenze in ogni momento tramite la nostra {" "}
            <Link href="/cookie" style={styles.link}>Cookie Policy</Link>.
          </p>
        </div>
        <div style={styles.buttons}>
          <button onClick={rejectCookies} style={styles.reject}>Rifiuta</button>
          <button onClick={acceptCookies} style={styles.accept}>Accetta tutto</button>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  bannerContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#fcfaf5",
    padding: "24px",
    borderTop: "3px solid #967346",
    zIndex: 999999,
    boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
  },
  bannerInner: {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  textWrapper: {
    flex: 1,
  },
  heading: {
    margin: "0 0 8px 0",
    color: "#2d4a3e",
    fontSize: "16px",
    fontWeight: 700,
  },
  text: {
    fontSize: "13px",
    color: "#5c5346",
    lineHeight: "1.6",
    margin: 0,
  },
  link: {
    color: "#967346",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  buttons: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },
  accept: {
    background: "#2d4a3e",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
  },
  reject: {
    background: "transparent",
    border: "1px solid #967346",
    padding: "10px 20px",
    borderRadius: "50px",
    cursor: "pointer",
    color: "#5c5346",
    fontWeight: 600,
    fontSize: "14px",
  },
};