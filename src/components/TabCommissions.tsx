import { useState } from "react";
import { useGame } from "../contexts/GameContext";

/* ───── Shop Item Definitions ───── */
interface ShopItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  price: string;
  priceGold: number; // for sorting/display
  popular?: boolean;
}

const shopItems: ShopItem[] = [
  {
    id: "consulting",
    name: "Scroll of Debugging",
    icon: "📜",
    description: "Hourly consulting and debugging sessions. I join your codebase and hunt bugs live.",
    price: "$5 USD / hr",
    priceGold: 5,
  },
  {
    id: "small-feature",
    name: "Minor Enchantment",
    icon: "✨",
    description: "A single feature implementation — e.g. one UI menu, one ability system, or one API endpoint.",
    price: "$15+ USD",
    priceGold: 15,
  },
  {
    id: "core-system",
    name: "Legendary Forging",
    icon: "🔨",
    description: "A full core system — complete inventory, combat framework, or authentication backend.",
    price: "$30+ USD",
    priceGold: 30,
    popular: true,
  },
  {
    id: "full-game",
    name: "Grand Expedition",
    icon: "🏰",
    description: "Full game development or large-scale custom contract. End-to-end engineering.",
    price: "On Demand",
    priceGold: 999,
  },
  {
    id: "web-app",
    name: "Arcane Portal",
    icon: "🌐",
    description: "Full-Stack Web Application with Laravel/React. Backend API + responsive frontend.",
    price: "$150+ USD",
    priceGold: 150,
  },
  {
    id: "landing-page",
    name: "Traveler's Map",
    icon: "🗺️",
    description: "Web portfolios, landing pages, and marketing sites. Tailwind + TypeScript.",
    price: "$50+ USD",
    priceGold: 50,
  },
  {
    id: "tech-art",
    name: "Artisan's Canvas",
    icon: "🖌️",
    description: "Technical art — Low-poly Blender models with Aseprite textures, optimized for in-engine use.",
    price: "On Demand",
    priceGold: 0,
  },
];

/* ───── Component ───── */
const TabCommissions = () => {
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const { addXp } = useGame();

  return (
    <div className="ase-section">
      <div className="ase-separator">// MERCHANT_SHOP.DAT</div>

      {/* Shop Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: 24, marginBottom: 8 }}>
          🏪 Merchant Shop
        </h1>
        <p style={{ color: "var(--color-ase-disabled)", fontSize: 13 }}>
          "Welcome, traveler! Browse my wares and find what you need."
        </p>
      </div>

      {/* Shop Grid */}
      <div className="shop-grid">
        {shopItems.map((item) => {
          const isSelected = selectedItem?.id === item.id;
          return (
            <div
              key={item.id}
              className={`shop-item ${isSelected ? "shop-item-selected" : ""}`}
              onClick={(e) => {
                setSelectedItem(isSelected ? null : item);
                addXp(10, e);
              }}
            >
              {item.popular && <div className="shop-popular-badge">⭐ POPULAR</div>}
              <div className="shop-item-icon">{item.icon}</div>
              <div className="shop-item-name">{item.name}</div>
              <div className="shop-item-price">
                <span className="shop-gold-icon">🪙</span>
                {item.price}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Item Detail */}
      {selectedItem && (
        <div className="ase-card" style={{ borderColor: "#fce205", marginTop: 16 }}>
          <div className="ase-card-title" style={{ background: "#fce20522" }}>
            <span>{selectedItem.icon}</span>
            {selectedItem.name}
            <span style={{ marginLeft: "auto", color: "#fce205", fontSize: 11 }}>
              🪙 {selectedItem.price}
            </span>
          </div>
          <div className="ase-card-body">
            <p style={{ marginBottom: 16, fontSize: 13 }}>
              {selectedItem.description}
            </p>
            <a
              href="https://discord.gg/h8TYQEay"
              target="_blank"
              rel="noreferrer"
              className="ase-btn ase-btn-primary"
              style={{ textDecoration: "none", width: "100%", justifyContent: "center" }}
            >
              🪙 Purchase — DM to Negotiate
            </a>
          </div>
        </div>
      )}

      {/* Contract Info */}
      <div className="ase-card" style={{ marginTop: 16 }}>
        <div className="ase-card-title">
          <span>📋</span>
          contract_terms.cfg
        </div>
        <div className="ase-card-body" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "var(--color-ase-disabled)", marginBottom: 6 }}>
            <strong>Flexible Contracts:</strong> Open to weekly/monthly salaries, % rev-share, upfront payments, and on-demand pricing.
          </p>
          <p style={{ fontSize: 11, color: "var(--color-ase-disabled)" }}>
            Payment accepted via DevEx equivalent (Robux), PayPal, or Crypto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TabCommissions;
