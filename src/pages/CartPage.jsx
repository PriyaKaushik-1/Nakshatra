import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
};

export default function CartPage({ cart, onRemove, onUpdateQty }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (cart.length === 0) return (
    <div style={{ paddingTop: 80, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", padding: "6rem 1.5rem", textAlign: "center" }}>
      <span style={{ fontSize: "4rem" }}>🧿</span>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300 }}>Your cart is empty</h2>
      <p style={{ color: "var(--ink-muted)" }}>Add some sacred products to get started.</p>
      <button onClick={() => navigate("/")} style={{ background: "var(--ink)", color: "var(--surface)", padding: "0.9rem 2rem", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, borderRadius: 2 }}>Browse Collection</button>
    </div>
  );

  return (
    <div style={{ paddingTop: 64, minHeight: "100vh" }}>
      <div style={{ padding: isMobile ? "2rem 1.25rem" : "3rem 4rem", maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 300, marginBottom: "2rem" }}>
          Shopping Cart <span style={{ color: "var(--ink-faint)", fontSize: "1rem" }}>({cart.length} items)</span>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: "2rem", alignItems: "start" }}>
          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {cart.map(item => (
              <div key={item.id} style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "64px 1fr" : "80px 1fr auto",
                gap: "1rem", alignItems: "center",
                background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: 4, padding: "1.1rem",
              }}>
                <div style={{ background: item.bg, borderRadius: 4, width: isMobile ? 64 : 80, height: isMobile ? 64 : 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? "1.8rem" : "2.2rem" }}>{item.emoji}</div>
                <div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 500, marginBottom: "0.2rem" }}>{item.category}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 500, marginBottom: "0.5rem" }}>{item.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-strong)", borderRadius: 2 }}>
                      <button onClick={() => onUpdateQty(item.id, item.qty - 1)} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-muted)" }}>−</button>
                      <span style={{ width: 28, textAlign: "center", fontSize: "0.85rem", fontWeight: 500 }}>{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, item.qty + 1)} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-muted)" }}>+</button>
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 500 }}>₹{(item.price * item.qty).toLocaleString()}</span>
                    <button onClick={() => onRemove(item.id)} style={{ fontSize: "0.72rem", color: "var(--ink-faint)", textDecoration: "underline" }}>Remove</button>
                  </div>
                </div>
                {!isMobile && (
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 500 }}>₹{(item.price * item.qty).toLocaleString()}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>₹{item.price.toLocaleString()} each</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: 4, padding: "1.75rem", position: isMobile ? "static" : "sticky", top: 100 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 500, marginBottom: "1.5rem" }}>Order Summary</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "var(--ink-muted)" }}><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "var(--ink-muted)" }}><span>Shipping</span><span style={{ color: shipping === 0 ? "green" : "inherit" }}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              {shipping > 0 && <div style={{ fontSize: "0.75rem", color: "var(--gold-dark)", background: "var(--gold-pale)", padding: "0.5rem 0.75rem", borderRadius: 2 }}>Add ₹{(999 - subtotal).toLocaleString()} more for free shipping!</div>}
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <span style={{ fontWeight: 500 }}>Total</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 500 }}>₹{total.toLocaleString()}</span>
            </div>
            <button onClick={() => navigate("/checkout")} style={{ width: "100%", padding: "1rem", background: "var(--ink)", color: "var(--surface)", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, borderRadius: 2, marginBottom: "0.75rem" }}>Proceed to Checkout</button>
            <button onClick={() => navigate("/")} style={{ width: "100%", padding: "0.85rem", background: "transparent", color: "var(--ink-muted)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, border: "1px solid var(--border)", borderRadius: 2 }}>Continue Shopping</button>
            <p style={{ textAlign: "center", fontSize: "0.7rem", color: "var(--ink-faint)", marginTop: "1rem" }}>🔒 Secure checkout · SSL encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
