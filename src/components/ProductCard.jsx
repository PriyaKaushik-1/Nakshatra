import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface-card)",
        border: `1px solid ${hovered ? "var(--gold-light)" : "var(--border)"}`,
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-sm)",
      }}
    >
      {/* Image area */}
      <div style={{
        height: 240,
        background: product.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <span style={{
          fontSize: "5rem",
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease",
          display: "block",
        }}>
          {product.emoji}
        </span>

        {product.badge && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            background: "var(--ink)", color: "var(--surface)",
            fontSize: "0.65rem", letterSpacing: "0.12em",
            textTransform: "uppercase", fontWeight: 500,
            padding: "4px 10px", borderRadius: 2,
          }}>
            {product.badge}
          </span>
        )}

        <span style={{
          position: "absolute", top: 12, right: 12,
          background: "var(--gold)", color: "white",
          fontSize: "0.65rem", letterSpacing: "0.08em",
          fontWeight: 600, padding: "4px 8px", borderRadius: 2,
        }}>
          -{discount}%
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: "1.25rem" }}>
        <div style={{
          fontSize: "0.68rem", letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--gold-dark)",
          fontWeight: 500, marginBottom: "0.4rem",
        }}>
          {product.category}
        </div>

        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.2rem", fontWeight: 500,
          color: "var(--ink)", marginBottom: "0.5rem",
          lineHeight: 1.3,
        }}>
          {product.name}
        </h3>

        <p style={{
          fontSize: "0.82rem", color: "var(--ink-muted)",
          lineHeight: 1.6, marginBottom: "1.1rem",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {product.description}
        </p>

        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem", fontWeight: 500, color: "var(--ink)",
            }}>
              ₹{product.price.toLocaleString()}
            </span>
            <span style={{
              fontSize: "0.8rem", color: "var(--ink-faint)",
              textDecoration: "line-through", marginLeft: "0.5rem",
            }}>
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAdd}
            style={{
              padding: "0.5rem 1rem",
              background: added ? "var(--gold)" : "var(--ink)",
              color: "var(--surface)",
              fontSize: "0.7rem", letterSpacing: "0.1em",
              textTransform: "uppercase", fontWeight: 500,
              borderRadius: 2, transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
