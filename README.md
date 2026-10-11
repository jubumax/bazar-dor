<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে**

👉 **[Click here to see the website](https://bazar-dor-uit6.vercel.app)**

</div>


## 📖 Description

**বাজার দর (BazarDor)** is a daily essential-goods price tracker for Bangladesh. It shows today's market prices of rice, pulses, oil, vegetables, fish, meat, eggs and spices, along with price changes and a market-wise price comparison, so users can see the latest prices at a glance.

## 🧰 Technologies Used

- **Next.js** (App Router) + **React**
- **TypeScript**
- **Tailwind CSS** + **daisyUI**
- **Better Auth** (Email/Password, Google, GitHub)
- **MongoDB**
- **react-hot-toast**, **react-marquee-text**, **react-icons**
- **Vercel** (deployment)

## ✨ Key Features

1. **Live price ticker & category navbar** — an infinitely scrolling strip of prices with ▲/▼ changes, plus category links with an active-link highlight and the Bangla date.
2. **Price movers on the home page** — Top 6 price risers, Top 6 fallers and an All Products grid, with Bengali digits and colour-coded change badges.
3. **Category pages with sorting** — sort by default, price low → high or high → low (sorted by numeric value, Bengali numerals handled), with skeleton loading and a friendly 404 state.
4. **Protected product details** — min, max and average price, plus a market-wise price table for every product (login required).
5. **Authentication & profile** — sign in / sign up with email, Google or GitHub, toast notifications, and a profile page where users can update their name.

-📱 *The whole website is fully responsive on mobile, tablet and desktop.*

## 🚀 Getting Started

```bash
git clone https://github.com/jubumax/bazar-dor
cd bazar-dor
npm install
cp .env.example .env.local          # fill in your own values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

© 2026 BazarDor — [@jubumax](https://linkedin.com/in/jubumax)
