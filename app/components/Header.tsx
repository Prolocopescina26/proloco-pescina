"use client";

import Link from "next/link";
import { useState } from "react";

type DropdownItem = {
  href: string;
  label: string;
};

type DropdownProps = {
  label: string;
  items: DropdownItem[];
};

function Dropdown({ label, items }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.dropdown}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        style={styles.linkButton}
      >
        {label}
      </button>
      {open && (
        <div style={styles.dropdownMenu}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={styles.dropdownLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        <Link href="/" style={styles.logo}>
          <img src="/images/logo-proloco.jpeg" alt="Pro Loco Pescina" style={styles.logoImg} />
        </Link>
      </div>

      <nav style={styles.nav}>
        <Dropdown label="Pro Loco ▾" items={[
          { href: "/attocostitutivo", label: "Atto Costitutivo & Statuto" },
          { href: "/lanostrastoria", label: "La nostra Storia" },
          { href: "/consigliedirettivo", label: "Consiglio direttivo" },
          { href: "/diventasocio", label: "Diventa Socio Pro Loco" },
        ]} />
        <Dropdown label="Eventi ▾" items={[
          { href: "/eventi", label: "In programma" },
          { href: "/eventi/storico", label: "Storico eventi" },
        ]} />
        <Link href="/" style={styles.link}>Home</Link>
        <Link href="/documenti" style={styles.link}>Documenti</Link>
        <Link href="/news" style={styles.link}>News</Link>
        <Link href="/valutaci" style={styles.link}>Valutaci</Link>
        <Link href="/contatti" style={styles.link}>Contatti</Link>
      </nav>
    </header>
  );
}

const styles: any = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "10px 20px", // Leggermente ridotto per mobile
    background: "rgba(255,255,255,0.96)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
  },
  brand: { display: "flex", alignItems: "center" },
  logo: { display: "flex", alignItems: "center", textDecoration: "none" },
  logoImg: {
    height: "auto",
    maxHeight: "45px", // Più piccolo su mobile
    width: "auto",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
    padding: "4px",
    borderRadius: 8,
    background: "rgba(255,255,255,0.7)",
    transition: "all 0.2s ease",
  },
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px", // Ridotto per stare in meno spazio
    alignItems: "center",
    justifyContent: "flex-end",
  },
  // ... resto degli stili invariato
  dropdown: { position: "relative" },
  linkButton: { all: "unset", cursor: "pointer", color: "#0B3D91", fontWeight: 700, fontSize: 13, padding: "8px 5px" },
  dropdownMenu: { position: "absolute", top: "110%", left: 0, minWidth: 200, padding: 12, background: "white", borderRadius: 18, boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)", display: "flex", flexDirection: "column", gap: 8, zIndex: 50 },
  dropdownLink: { color: "#0B3D91", textDecoration: "none", fontSize: 13, fontWeight: 700, padding: "8px 10px", borderRadius: 12 },
  link: { color: "#0B3D91", textDecoration: "none", fontWeight: 700, fontSize: 13 },
};