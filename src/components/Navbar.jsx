import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("scroll", handleScroll); window.removeEventListener("resize", handleResize); };
  }, []);

  // Close menu on navigation
  const handleNav = (path) => { setMenuOpen(false); navigate(path); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "1rem 1.25rem" : "1.1rem 4rem",
        background: scrolled || menuOpen ? "rgba(250,249,247,0.98)" : "rgba(250,249,247,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? "rgba(26,23,20,0.12)" : "transparent"}`,
        transition: "all 0.3s ease",
      }}>
        <Link to="/" onClick={() => setMenuOpen(false)} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.45rem", fontWeight: 400,
          letterSpacing: "0.08em", color: "var(--ink)",
        }}>
          Nak<span style={{ color: "var(--gold)" }}>shatra</span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
            {["Products", "About", "Rituals", "Blog"].map((item) => (
              <li key={item}>
                <Link to="/" style={{
                  fontSize: "0.75rem", letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "var(--ink-muted)",
                  fontWeight: 500, transition: "color 0.2s",
                }}
                onMouseEnter={e => e.target.style.color = "var(--ink)"}
                onMouseLeave={e => e.target.style.color = "var(--ink-muted)"}
                >{item}</Link>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Cart button */}
          <button onClick={() => handleNav("/cart")} style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            fontSize: "0.75rem", letterSpacing: "0.12em",
            textTransform: "uppercase", fontWeight: 500,
            color: "var(--ink)", position: "relative",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {!isMobile && "Cart"}
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -6, right: -8,
                background: "var(--gold)", color: "white",
                borderRadius: "50%", width: 16, height: 16,
                fontSize: "0.62rem", display: "flex",
                alignItems: "center", justifyContent: "center", fontWeight: 600,
              }}>{cartCount}</span>
            )}
          </button>

          {/* Hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} style={{
              display: "flex", flexDirection: "column", gap: 5,
              padding: "4px", cursor: "pointer",
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block", width: 22, height: 1.5,
                  background: "var(--ink)", borderRadius: 2,
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                    : i === 2 ? "rotate(-45deg) translate(4.5px, -4.5px)"
                    : "scaleX(0)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile drawer */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 56, left: 0, right: 0, zIndex: 199,
          background: "rgba(250,249,247,0.98)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          padding: menuOpen ? "1.5rem 1.5rem 2rem" : "0 1.5rem",
          maxHeight: menuOpen ? 320 : 0,
          overflow: "hidden",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {["Products", "About", "Rituals", "Blog"].map((item) => (
              <li key={item}>
                <Link to="/" onClick={() => setMenuOpen(false)} style={{
                  display: "block", padding: "0.85rem 0",
                  fontSize: "1.05rem", fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400, color: "var(--ink)",
                  borderBottom: "1px solid var(--border)",
                }}>{item}</Link>
              </li>
            ))}
            <li style={{ marginTop: "1rem" }}>
              <button onClick={() => handleNav("/checkout")} style={{
                width: "100%", padding: "0.85rem",
                background: "var(--ink)", color: "var(--surface)",
                fontSize: "0.78rem", letterSpacing: "0.12em",
                textTransform: "uppercase", fontWeight: 500, borderRadius: 2,
              }}>Shop Now</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
