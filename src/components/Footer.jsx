import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
};

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer style={{ background: "var(--ink)", color: "rgba(250,249,247,0.7)", padding: isMobile ? "3rem 1.5rem 1.5rem" : "4rem 4rem 2rem" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
        gap: isMobile ? "2rem" : "3rem",
        marginBottom: "2.5rem",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        paddingBottom: "2.5rem",
      }}>
        <div style={{ gridColumn: isMobile ? "1/-1" : "auto" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "0.08em", color: "var(--surface)", marginBottom: "0.85rem" }}>
            Nak<span style={{ color: "var(--gold)" }}>shatra</span>
          </div>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.8, maxWidth: 280 }}>
            Handpicked sacred products from ancient traditions — bringing protection, clarity, and cosmic alignment to your everyday life.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}>
            {["Instagram", "Pinterest", "YouTube"].map(s => <a key={s} href="#" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>{s}</a>)}
          </div>
        </div>

        {[
          { title: "Shop", links: ["Evil Eye", "Rudraksha", "Crystals", "Malas", "Gift Sets"] },
          { title: "Learn", links: ["Evil Eye Guide", "Rudraksha Guide", "Chakra Basics", "Blog", "FAQ"] },
          { title: "Support", links: ["Track Order", "Returns", "Contact Us", "Wholesale", "Sitemap"] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--surface)", fontWeight: 500, marginBottom: "1rem" }}>{col.title}</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {col.links.map(l => (
                <li key={l}><a href="#" style={{ fontSize: "0.82rem" }} onMouseEnter={e => e.target.style.color = "var(--surface)"} onMouseLeave={e => e.target.style.color = "rgba(250,249,247,0.7)"}>{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: "0.75rem", fontSize: "0.72rem" }}>
        <span>© 2025 Nakshatra. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#" style={{ color: "inherit" }}>Privacy Policy</a>
          <a href="#" style={{ color: "inherit" }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
