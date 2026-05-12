import { useState, useEffect } from "react";
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

const inputStyle = (focused) => ({
  width: "100%", padding: "0.75rem 1rem",
  border: `1px solid ${focused ? "var(--gold)" : "var(--border-strong)"}`,
  boxShadow: focused ? "0 0 0 2px rgba(201,169,110,0.15)" : "none",
  borderRadius: 2, fontSize: "0.9rem",
  fontFamily: "'DM Sans', sans-serif",
  color: "var(--ink)", background: "var(--surface-card)",
  outline: "none", transition: "border 0.2s",
});

function Field({ label, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, color: "var(--ink-muted)", marginBottom: "0.4rem" }}>{label}</label>
      <input {...props} style={inputStyle(focused)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
    </div>
  );
}

// ── Razorpay Mock Modal ──────────────────────────────────────────────────────
function RazorpayModal({ amount, onSuccess, onClose }) {
  const [step, setStep] = useState("method");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [upi, setUpi] = useState("");
  const [error, setError] = useState("");

  const formatCard = v => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = v => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? `${d.slice(0,2)}/${d.slice(2)}` : d; };

  const processPayment = () => {
    setStep("processing");
    setTimeout(() => { setStep("done"); setTimeout(() => onSuccess(), 1500); }, 2200);
  };

  const handleCardPay = () => {
    if (card.number.replace(/\s/g,"").length < 16) { setError("Enter a valid 16-digit card number"); return; }
    if (card.expiry.length < 5) { setError("Enter a valid expiry date"); return; }
    if (card.cvv.length < 3) { setError("Enter a valid CVV"); return; }
    if (!card.name.trim()) { setError("Enter cardholder name"); return; }
    setError(""); processPayment();
  };

  const handleUpiPay = () => {
    if (!upi.includes("@")) { setError("Enter a valid UPI ID (e.g. name@upi)"); return; }
    setError(""); processPayment();
  };

  const rzpInput = {
    width: "100%", padding: "0.7rem 0.85rem",
    border: "1px solid #e0e0e0", borderRadius: 6,
    fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif",
    color: "#333", outline: "none",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "white", width: "100%", maxWidth: 420, borderRadius: 8, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.25)", animation: "fadeUp 0.3s ease" }}>
        {/* Header */}
        <div style={{ background: "#072654", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: "1rem" }}><span style={{ color: "#3395FF" }}>razor</span>pay</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", marginTop: 2 }}>Nakshatra · ₹{amount.toLocaleString()}</div>
          </div>
          <button onClick={onClose} style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          {step === "processing" && (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ width: 48, height: 48, border: "3px solid #f0f0f0", borderTop: "3px solid #3395FF", borderRadius: "50%", margin: "0 auto 1rem", animation: "spin 0.8s linear infinite" }} />
              <p style={{ fontWeight: 500, color: "#333" }}>Processing your payment...</p>
              <p style={{ fontSize: "0.8rem", color: "#888", marginTop: 4 }}>Please do not close this window</p>
            </div>
          )}
          {step === "done" && (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ width: 56, height: 56, background: "#e8f8ef", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "1.8rem" }}>✓</div>
              <p style={{ fontWeight: 600, color: "#1a1714", fontSize: "1.1rem" }}>Payment Successful!</p>
              <p style={{ fontSize: "0.8rem", color: "#888", marginTop: 4 }}>Redirecting...</p>
            </div>
          )}
          {step === "method" && (
            <>
              <p style={{ fontSize: "0.82rem", color: "#666", marginBottom: "1rem" }}>Choose payment method</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[{ id: "card", label: "Credit / Debit Card", icon: "💳" }, { id: "upi", label: "UPI", icon: "📱" }, { id: "netbanking", label: "Net Banking", icon: "🏦" }, { id: "wallet", label: "Wallets", icon: "👛" }].map(m => (
                  <button key={m.id} onClick={() => setStep(["netbanking","wallet"].includes(m.id) ? "method" : m.id)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1rem", border: "1px solid #e0e0e0", borderRadius: 6, background: "white", fontSize: "0.88rem", color: "#333", textAlign: "left", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#3395FF"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#e0e0e0"}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{m.icon}</span>
                    <span style={{ flex: 1 }}>{m.label}</span>
                    <span style={{ color: "#bbb" }}>›</span>
                  </button>
                ))}
              </div>
            </>
          )}
          {step === "card" && (
            <>
              <button onClick={() => { setStep("method"); setError(""); }} style={{ fontSize: "0.78rem", color: "#3395FF", marginBottom: "1rem", cursor: "pointer" }}>← Back</button>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div><label style={{ display: "block", fontSize: "0.72rem", color: "#666", marginBottom: 4 }}>Card Number</label><input placeholder="4111 1111 1111 1111" value={card.number} onChange={e => setCard({ ...card, number: formatCard(e.target.value) })} style={rzpInput} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div><label style={{ display: "block", fontSize: "0.72rem", color: "#666", marginBottom: 4 }}>Expiry</label><input placeholder="MM/YY" value={card.expiry} onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })} style={rzpInput} /></div>
                  <div><label style={{ display: "block", fontSize: "0.72rem", color: "#666", marginBottom: 4 }}>CVV</label><input placeholder="•••" type="password" maxLength={4} value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g,"").slice(0,4) })} style={rzpInput} /></div>
                </div>
                <div><label style={{ display: "block", fontSize: "0.72rem", color: "#666", marginBottom: 4 }}>Cardholder Name</label><input placeholder="As on card" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} style={rzpInput} /></div>
                {error && <p style={{ fontSize: "0.78rem", color: "#e24b4a", padding: "0.5rem", background: "#fff5f5", borderRadius: 4 }}>{error}</p>}
                <button onClick={handleCardPay} style={{ width: "100%", padding: "0.95rem", background: "#3395FF", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 600, borderRadius: 6, border: "none", cursor: "pointer" }}>Pay ₹{amount.toLocaleString()}</button>
              </div>
            </>
          )}
          {step === "upi" && (
            <>
              <button onClick={() => { setStep("method"); setError(""); }} style={{ fontSize: "0.78rem", color: "#3395FF", marginBottom: "1rem", cursor: "pointer" }}>← Back</button>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", color: "#666", marginBottom: 4 }}>UPI ID</label>
                <input placeholder="yourname@upi" value={upi} onChange={e => setUpi(e.target.value)} style={{ ...rzpInput, marginBottom: "0.85rem" }} />
                {error && <p style={{ fontSize: "0.78rem", color: "#e24b4a", marginBottom: "0.75rem" }}>{error}</p>}
                <button onClick={handleUpiPay} style={{ width: "100%", padding: "0.95rem", background: "#3395FF", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 600, borderRadius: 6, border: "none", cursor: "pointer" }}>Pay ₹{amount.toLocaleString()}</button>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {["GPay","PhonePe","Paytm","BHIM"].map(app => <span key={app} style={{ padding: "4px 10px", border: "1px solid #e8e8e8", borderRadius: 4, fontSize: "0.7rem", color: "#aaa", cursor: "pointer" }}>{app}</span>)}
              </div>
            </>
          )}
          {!["processing","done"].includes(step) && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginTop: "1rem", fontSize: "0.68rem", color: "#aaa" }}>🔒 Secured by Razorpay</div>}
        </div>
      </div>
    </div>
  );
}

// ── Main Checkout Page ───────────────────────────────────────────────────────
export default function CheckoutPage({ cart }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" });
  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.includes("@")) e.email = true;
    if (form.phone.replace(/\D/g,"").length < 10) e.phone = true;
    if (!form.address.trim()) e.address = true;
    if (!form.city.trim()) e.city = true;
    if (!form.state.trim()) e.state = true;
    if (form.pincode.replace(/\D/g,"").length < 6) e.pincode = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleProceed = () => { 
    // if (validate()) setShowRazorpay(true); 
    const rzp = new window.Razorpay({
     key: "rzp_test_SoReEJJwKrc4Rg",  // ← your key
     amount: total * 100,               // paise
     currency: "INR",
     name: "Nakshatra",
     prefill: { name: form.name, email: form.email, contact: form.phone },
     theme: { color: "#C9A96E" },
     handler: (response) => setOrderPlaced(true),
   });
   rzp.open();
  };
  const handleSuccess = () => { setShowRazorpay(false); setOrderPlaced(true); };

  if (orderPlaced) return (
    <div style={{ paddingTop: 64, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", textAlign: "center", padding: isMobile ? "4rem 1.5rem" : "6rem 4rem" }}>
      <div style={{ width: 72, height: 72, background: "var(--gold-pale)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem", marginBottom: "0.5rem" }}>🎉</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "2.2rem" : "2.8rem", fontWeight: 300 }}>Order Confirmed!</h1>
      <p style={{ color: "var(--ink-muted)", maxWidth: 420, lineHeight: 1.8, fontSize: "0.92rem" }}>
        Thank you, <strong>{form.name}</strong>! Your sacred products are being blessed and will be dispatched within 24 hours. A confirmation has been sent to <strong>{form.email}</strong>.
      </p>
      <div style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: 4, padding: "1.5rem 2rem", fontSize: "0.85rem", color: "var(--ink-muted)", lineHeight: 1.8, textAlign: "left", width: "100%", maxWidth: 380 }}>
        <div><strong>Order ID:</strong> NKS-{Math.floor(100000 + Math.random() * 900000)}</div>
        <div><strong>Amount Paid:</strong> ₹{total.toLocaleString()}</div>
        <div><strong>Expected Delivery:</strong> 3–5 business days</div>
      </div>
      <button onClick={() => navigate("/")} style={{ background: "var(--ink)", color: "var(--surface)", padding: "0.9rem 2.5rem", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, borderRadius: 2 }}>Continue Shopping</button>
    </div>
  );

  return (
    <div style={{ paddingTop: 64, minHeight: "100vh" }}>
      {showRazorpay && <RazorpayModal amount={total} onSuccess={handleSuccess} onClose={() => setShowRazorpay(false)} />}

      <div style={{ padding: isMobile ? "2rem 1.25rem" : "3rem 4rem", maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 300, marginBottom: "2rem" }}>Checkout</h1>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--ink-muted)", marginBottom: "1rem" }}>Your cart is empty.</p>
            <button onClick={() => navigate("/")} style={{ background: "var(--ink)", color: "var(--surface)", padding: "0.85rem 2rem", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, borderRadius: 2 }}>Shop Now</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 380px", gap: "2rem", alignItems: "start" }}>

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: 4, padding: isMobile ? "1.5rem" : "2rem" }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 500, marginBottom: "1.5rem" }}>Contact Information</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                    <Field label="Full Name" placeholder="Arjun Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <Field label="Email Address" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <Field label="Phone Number" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                {Object.keys(errors).some(k => ["name","email","phone"].includes(k)) && <p style={{ fontSize: "0.78rem", color: "#e24b4a", marginTop: "0.5rem" }}>Please fill in all contact details correctly.</p>}
              </div>

              <div style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: 4, padding: isMobile ? "1.5rem" : "2rem" }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 500, marginBottom: "1.5rem" }}>Delivery Address</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <Field label="Street Address" placeholder="123, Lotus Lane, Sector 5" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                    <Field label="City" placeholder="Mumbai" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                    <Field label="State" placeholder="Maharashtra" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
                    <Field label="Pincode" placeholder="400001" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} />
                  </div>
                </div>
                {Object.keys(errors).some(k => ["address","city","state","pincode"].includes(k)) && <p style={{ fontSize: "0.78rem", color: "#e24b4a", marginTop: "0.5rem" }}>Please fill in all address fields correctly.</p>}
              </div>
            </div>

            {/* Order Summary */}
            <div style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: 4, padding: "1.75rem", position: isMobile ? "static" : "sticky", top: 100 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 500, marginBottom: "1.5rem" }}>Order Summary</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.25rem" }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, background: item.bg, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>{item.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: 500, lineHeight: 1.3 }}>{item.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--ink-muted)" }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 500, whiteSpace: "nowrap" }}>₹{(item.price * item.qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--ink-muted)" }}><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--ink-muted)" }}><span>Shipping</span><span style={{ color: shipping === 0 ? "green" : "inherit" }}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              </div>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontWeight: 500 }}>Total (INR)</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 500 }}>₹{total.toLocaleString()}</span>
              </div>
              <button onClick={handleProceed} style={{ width: "100%", padding: "1rem", background: "var(--ink)", color: "var(--surface)", fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, borderRadius: 2, marginBottom: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
                Pay with Razorpay <span>→</span>
              </button>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginBottom: "0.75rem" }}>
                {["💳","📱","🏦","👛"].map((icon, i) => <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 4, padding: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{icon}</div>)}
              </div>
              <p style={{ textAlign: "center", fontSize: "0.68rem", color: "var(--ink-faint)" }}>🔒 Secured by Razorpay · UPI · Cards · NetBanking</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
