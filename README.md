# Nakshatra — Sacred Astrology Products

A modern, **fully responsive** React e-commerce website for astrology products (Evil Eye, Rudraksha, etc.) with a Razorpay mock checkout.

## 🚀 Getting Started

```bash
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        ← hamburger menu on mobile
│   ├── Footer.jsx
│   └── ProductCard.jsx
├── pages/
│   ├── HomePage.jsx      ← hero, products, testimonials
│   ├── ProductPage.jsx   ← product detail
│   ├── CartPage.jsx      ← cart & summary
│   └── CheckoutPage.jsx  ← form + Razorpay modal
├── data/
│   └── products.js       ← ✏️ EDIT YOUR PRODUCTS HERE
└── App.js
```

---

## 💳 HOW TO CHANGE PAYMENT DETAILS (Razorpay)

### Step 1 — Create a Razorpay Account
1. Go to **https://razorpay.com** → Sign Up
2. Complete KYC (business/individual)
3. Dashboard → **Settings → API Keys → Generate Key**
4. Copy your **Key ID** (starts with `rzp_test_` for test mode)

### Step 2 — Add the Razorpay Script
In `public/index.html`, add inside `<head>`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### Step 3 — Replace the Mock Modal
Open `src/pages/CheckoutPage.jsx`.
Find the `RazorpayModal` component and replace the entire `handleProceed` function call with:

```js
const handleProceed = () => {
  if (!validate()) return;

  const options = {
    key: "rzp_test_XXXXXXXXXXXXXXXX",   // ← PASTE YOUR KEY ID HERE
    amount: total * 100,                 // in paise (₹1 = 100 paise)
    currency: "INR",
    name: "Nakshatra",
    description: "Sacred Astrology Products",
    image: "/logo.png",                  // optional — your logo URL

    handler: function (response) {
      // response.razorpay_payment_id — save this to your backend
      setOrderPlaced(true);
    },

    prefill: {
      name: form.name,
      email: form.email,
      contact: form.phone,
    },

    notes: {
      address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
    },

    theme: {
      color: "#C9A96E",   // matches our gold brand colour
    },

    modal: {
      ondismiss: () => console.log("Payment cancelled"),
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
```

Also remove `{showRazorpay && <RazorpayModal ... />}` from the JSX — you no longer need the mock modal.

### Step 4 — Go Live
When ready for real payments:
- Replace `rzp_test_XXXX` with your **live key** (`rzp_live_XXXX`)
- Handle `razorpay_payment_id` on your backend to verify payment signature

---

## 🛍️ HOW TO EDIT PRODUCTS

Open `src/data/products.js` — each product looks like:

```js
{
  id: 1,
  name: "Turkish Evil Eye Bracelet",
  category: "Evil Eye",          // used for filter buttons
  price: 1299,                   // in ₹
  originalPrice: 1899,           // crossed-out price
  badge: "Bestseller",           // or null
  description: "Short text...",  // shown on card
  longDescription: "Long text...",// shown on product page
  features: ["Feature 1", ...],  // bullet list on product page
  emoji: "🧿",                   // displayed as product image
  color: "#3b82f6",              // accent color
  bg: "#eff6ff",                 // card background color
}
```

To add a new category, add it to the `categories` array at the bottom of the file:
```js
export const categories = ["All", "Evil Eye", "Rudraksha", "Crystals"];
```

---

## 📱 Responsive Breakpoints

| Screen | Layout |
|--------|--------|
| < 768px (mobile) | Single column, hamburger nav |
| ≥ 768px (tablet/desktop) | Two-column hero, grid products |

