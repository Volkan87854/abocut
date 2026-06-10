"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header style={{
      background: "var(--white)",
      borderBottom: "1px solid var(--border)",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Image
            src="/logo-transparent.png"
            alt="abocut"
            width={150}
            height={40}
            style={{ objectFit: "contain", height: 38, width: "auto", display: "block" }}
            priority
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/#alle" style={{ color: "var(--ink-muted)", textDecoration: "none", fontSize: "0.88rem", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Anbieter</Link>
          <Link href="/#wie" style={{ color: "var(--ink-muted)", textDecoration: "none", fontSize: "0.88rem", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>So geht&apos;s</Link>
          <Link href="/#alle" className="btn-primary" style={{ padding: "0.55rem 1.25rem", fontSize: "0.85rem" }}>
            Jetzt kündigen
          </Link>
        </div>
      </div>
    </header>
  );
}
