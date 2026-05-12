import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
};

const EvilEyeSVG = () => (
  <svg viewBox="0 0 200 200" width="130" height="130" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="100" rx="90" ry="55" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <ellipse cx="100" cy="100" rx="55" ry="55" fill="#2563eb"/>
    <ellipse cx="100" cy="100" rx="35" ry="35" fill="#1e3a8a"/>
    <ellipse cx="100" cy="100" rx="15" ry="15" fill="#0f172a"/>
    <ellipse cx="90" cy="90" rx="6" ry="6" fill="white" opacity="0.9"/>
    <ellipse cx="107" cy="95" rx="3" ry="3" fill="white" opacity="0.6"/>
  </svg>
);

const testimonials = [
  { name: "Priya S.", city: "Mumbai", text: "My evil eye bracelet arrived beautifully packaged. I've been wearing it for 3 months and honestly feel so much more at peace.", stars: 5 },
  { name: "Rahul M.", city: "Bengaluru", text: "The 5-Mukhi Rudraksha mala is absolutely genuine. You can feel the energy the moment you hold it. Fast delivery too!", stars: 5 },
  { name: "Ananya K.", city: "Delhi", text: "Gifted the 7-Chakra set to my mother. She loves it and meditates with it every morning. Wonderful quality.", stars: 5 },
];

export default function HomePage({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        paddingTop: 64,
      }}>
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: isMobile ? "3rem 1.5rem 2rem" : "6rem 4rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{
            fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--gold)", fontWeight: 500, marginBottom: "1.25rem",
            display: "flex", alignItems: "center", gap: "0.6rem",
          }}>
            <span style={{ width: 24, height: 1, background: "var(--gold)", display: "inline-block" }} />
            Sacred Products for Modern Life
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? "2.8rem" : "clamp(3rem, 5vw, 4.8rem)",
            fontWeight: 300, lineHeight: 1.08, color: "var(--ink)", marginBottom: "1.25rem",
          }}>
            Protect Your <br />
            <em style={{ fontStyle: "italic", color: "var(--gold-dark)" }}>Energy</em> &amp;{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold-dark)" }}>Spirit</em>
          </h1>

          <p style={{ fontSize: "0.92rem", color: "var(--ink-muted)", maxWidth: 380, marginBottom: "2rem", lineHeight: 1.85 }}>
            Authentic Evil Eye talismans and blessed Rudraksha malas — handpicked from artisans who carry centuries of tradition.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                background: "var(--ink)", color: "var(--surface)",
                padding: "0.85rem 1.75rem", fontSize: "0.75rem",
                letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, borderRadius: 2,
              }}
            >
              Shop Collection
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            {/* <button style={{
              background: "transparent", color: "var(--ink)",
              padding: "0.85rem 1.75rem", fontSize: "0.75rem",
              letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500,
              borderRadius: 2, border: "1px solid var(--border-strong)",
            }}>Our Story</button> */}
          </div>

          <div style={{
            display: "flex", gap: isMobile ? "1.5rem" : "2.5rem",
            marginTop: "2.5rem", paddingTop: "2rem",
            borderTop: "1px solid var(--border)", flexWrap: "wrap",
          }}>
            {[["1k+", "Happy Customers"], ["100%", "Authentic"], ["24hr", "Delivery"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 500, color: "var(--gold-dark)" }}>{n}</div>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: "var(--ink-muted)", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div style={{
          background: "var(--surface-warm)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          minHeight: isMobile ? 280 : "auto",
          opacity: visible ? 1 : 0, transition: "opacity 1.2s ease 0.3s",
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 60% 40%, rgba(201,169,110,0.08) 0%, transparent 60%)" }} />
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: isMobile ? 220 : 320, height: isMobile ? 220 : 320,
              border: "1px solid var(--gold-light)", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "rotateOrb 30s linear infinite",
            }}>
              {[0, 60, 120, 180, 240, 300].map(deg => (
                <div key={deg} style={{
                  position: "absolute", width: 5, height: 5, background: "var(--gold)", borderRadius: "50%",
                  transform: `rotate(${deg}deg) translateX(${isMobile ? 110 : 160}px)`, opacity: 0.6,
                }} />
              ))}
            </div>
            <div style={{
              position: "absolute", width: isMobile ? 170 : 250, height: isMobile ? 170 : 250,
              border: "1px solid var(--border)", borderRadius: "50%",
            }} />
            <div style={{
              position: "absolute", background: "white", borderRadius: "50%",
              padding: isMobile ? "1.5rem" : "2.5rem",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            }}>
              <EvilEyeSVG />
            </div>
          </div>
          <div style={{
            position: "absolute", bottom: "1.5rem", right: "1.5rem",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.82rem", fontStyle: "italic", color: "var(--ink-muted)",
          }}>Blessed &amp; Energised</div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: "var(--ink)", padding: "0.85rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex", gap: "3rem", animation: "marqueeScroll 20s linear infinite" }}>
          {Array(4).fill(null).flatMap((_, i) =>
            ["Evil Eye Protection","✦","Rudraksha Malas","✦","Blessed Crystals","✦","Sacred Geometry","✦","Free Shipping Over ₹999","✦"].map((t, j) => (
              <span key={`${i}-${j}`} style={{
                fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase",
                fontWeight: 500, color: t === "✦" ? "var(--gold)" : "rgba(250,249,247,0.8)",
              }}>{t}</span>
            ))
          )}
        </div>
      </div>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: isMobile ? "3.5rem 1.25rem" : "6rem 4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 500, marginBottom: "0.6rem" }}>— Our Collection —</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1.8rem" : "2.8rem", fontWeight: 300, color: "var(--ink)" }}>Sacred Products, Mindfully Sourced</h2>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", marginBottom: "2.25rem", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: "0.5rem 1.25rem", fontSize: "0.72rem", letterSpacing: "0.1em",
              textTransform: "uppercase", fontWeight: 500, borderRadius: 2, transition: "all 0.2s",
              background: activeCategory === cat ? "var(--ink)" : "transparent",
              color: activeCategory === cat ? "var(--surface)" : "var(--ink-muted)",
              border: `1px solid ${activeCategory === cat ? "var(--ink)" : "var(--border-strong)"}`,
            }}>{cat}</button>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.25rem",
        }}>
          {filtered.map((product, i) => (
            <div key={product.id} style={{ opacity: 0, animation: `fadeUp 0.5s ease forwards`, animationDelay: `${i * 0.08}s` }}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "var(--surface-warm)", padding: isMobile ? "3rem 1.5rem" : "5rem 4rem", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: "1.75rem", textAlign: "center" }}>
          {[
            { icon: "🛡️", title: "100% Authentic", desc: "Every product verified for genuineness by our in-house astrologer." },
            { icon: "🙏", title: "Puja Blessed", desc: "All items go through a traditional energising ritual before dispatch." },
            { icon: "📦", title: "Secure Packaging", desc: "Eco-friendly boxes with silk lining for safe, beautiful delivery." },
            { icon: "↩️", title: "Easy Returns", desc: "Not satisfied? Return within 15 days — no questions asked." },
          ].map(f => (
            <div key={f.title}>
              <div style={{ fontSize: "1.75rem", marginBottom: "0.6rem" }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 500, marginBottom: "0.4rem" }}>{f.title}</h3>
              <p style={{ fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: isMobile ? "3.5rem 1.25rem" : "6rem 4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 500, marginBottom: "0.6rem" }}>— What People Say —</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1.8rem" : "2.2rem", fontWeight: 300 }}>Stories of Protection</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.25rem" }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: 4, padding: "1.75rem" }}>
              <div style={{ color: "var(--gold)", fontSize: "0.9rem", marginBottom: "0.85rem", letterSpacing: 3 }}>{"★".repeat(t.stars)}</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontStyle: "italic", color: "var(--ink)", lineHeight: 1.8, marginBottom: "1rem" }}>"{t.text}"</p>
              <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--ink-muted)" }}>{t.name} <span style={{ color: "var(--ink-faint)" }}>· {t.city}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* <section style={{ background: "var(--ink)", padding: isMobile ? "3.5rem 1.5rem" : "5rem 4rem", textAlign: "center" }}>
        <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 500, marginBottom: "0.75rem" }}>Limited Time</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1.8rem" : "2.8rem", fontWeight: 300, color: "var(--surface)", marginBottom: "0.85rem" }}>
          Free Shipping on Orders Over ₹999
        </h2>
        <p style={{ color: "rgba(250,249,247,0.65)", fontSize: "0.9rem", marginBottom: "2rem" }}>
          Use code <span style={{ color: "var(--gold)", fontWeight: 600 }}>NAKSHATRA20</span> for 20% off your first order.
        </p> */}
        {/* <button
          onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            background: "var(--gold)", color: "var(--ink)",
            padding: "0.95rem 2.25rem", fontSize: "0.75rem",
            letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, borderRadius: 2,
          }}
        >
          Shop Now
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </section> */}
    </div>
  );
}
