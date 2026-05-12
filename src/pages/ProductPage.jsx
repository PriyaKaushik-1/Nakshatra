import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
};

export default function ProductPage({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const isMobile = useIsMobile();

  if (!product) return (
    <div style={{ padding: "8rem 1.5rem", textAlign: "center" }}>
      <p>Product not found.</p>
      <button onClick={() => navigate("/")} style={{ marginTop: "1rem", textDecoration: "underline" }}>Back to home</button>
    </div>
  );

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleBuyNow = () => { onAddToCart({ ...product, qty }); navigate("/checkout", { state: { product, qty } }); };
  const handleAddCart = () => { for (let i = 0; i < qty; i++) onAddToCart(product); setAdded(true); setTimeout(() => setAdded(false), 2000); };

  return (
    <div style={{ paddingTop: 64, minHeight: "100vh" }}>
      <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--border)", fontSize: "0.78rem", color: "var(--ink-muted)", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <button onClick={() => navigate("/")} style={{ color: "var(--ink-muted)", cursor: "pointer" }}>Home</button>
        <span>/</span>
        <span style={{ color: "var(--gold-dark)" }}>{product.name}</span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "0" : "4rem",
        padding: isMobile ? "0 0 3rem" : "4rem 4rem",
        maxWidth: 1200, margin: "0 auto",
      }}>
        {/* Image */}
        <div style={{
          background: product.bg, borderRadius: isMobile ? 0 : 4,
          height: isMobile ? 280 : 520,
          display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
        }}>
          <span style={{ fontSize: isMobile ? "7rem" : "10rem", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))" }}>{product.emoji}</span>
          <span style={{ position: "absolute", top: 16, left: 16, background: "var(--gold)", color: "white", fontSize: "0.7rem", letterSpacing: "0.1em", fontWeight: 600, padding: "5px 12px", borderRadius: 2 }}>-{discount}% OFF</span>
          {product.badge && <span style={{ position: "absolute", top: 16, right: 16, background: "var(--ink)", color: "var(--surface)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, padding: "4px 10px", borderRadius: 2 }}>{product.badge}</span>}
        </div>

        {/* Details */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "2rem 1.5rem" : "0" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 500, marginBottom: "0.5rem" }}>{product.category}</div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "2rem" : "2.4rem", fontWeight: 400, color: "var(--ink)", marginBottom: "1rem", lineHeight: 1.2 }}>{product.name}</h1>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline", marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 500, color: "var(--ink)" }}>₹{product.price.toLocaleString()}</span>
            <span style={{ fontSize: "0.9rem", color: "var(--ink-faint)", textDecoration: "line-through" }}>₹{product.originalPrice.toLocaleString()}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--gold-dark)", fontWeight: 500 }}>Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
          </div>

          <p style={{ fontSize: "0.9rem", color: "var(--ink-muted)", lineHeight: 1.85, marginBottom: "1.5rem" }}>{product.longDescription}</p>

          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, color: "var(--ink)", marginBottom: "0.6rem" }}>What's Included</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {product.features.map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", color: "var(--ink-muted)" }}>
                  <span style={{ color: "var(--gold)" }}>✓</span>{f}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>Qty</span>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-strong)", borderRadius: 2 }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: "var(--ink-muted)" }}>−</button>
              <span style={{ width: 40, textAlign: "center", fontSize: "0.9rem", fontWeight: 500 }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: "var(--ink-muted)" }}>+</button>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexDirection: isMobile ? "column" : "row" }}>
            <button onClick={handleBuyNow} style={{ flex: 1, padding: "0.95rem", background: "var(--ink)", color: "var(--surface)", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, borderRadius: 2 }}>Buy Now</button>
            <button onClick={handleAddCart} style={{ flex: 1, padding: "0.95rem", background: added ? "var(--gold)" : "transparent", color: added ? "white" : "var(--ink)", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, borderRadius: 2, border: "1px solid var(--border-strong)", transition: "all 0.2s" }}>
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--gold-pale)", borderRadius: 2, display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.1rem" }}>🙏</span>
            <p style={{ fontSize: "0.8rem", color: "var(--gold-dark)", lineHeight: 1.6 }}>This product has been puja-blessed and energised by our resident astrologer before shipping.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
