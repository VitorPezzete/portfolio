import { useState, useRef } from "react";
import { useGame } from "../contexts/GameContext";

/* ───── RPG Item Definitions ───── */
type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

interface SkillItem {
  id: string;
  name: string;
  icon: string;
  rarity: Rarity;
  type: string;
  category: "game" | "web" | "art";
  passive: string;
  stats: { label: string; value: string }[];
  lore: string;
}

const RARITY_COLORS: Record<Rarity, string> = {
  Common: "#9d9d9d",
  Uncommon: "#1eff00",
  Rare: "#0070dd",
  Epic: "#a335ee",
  Legendary: "#ff8000",
};

const RARITY_GLOW: Record<Rarity, string> = {
  Common: "none",
  Uncommon: "0 0 6px #1eff0044",
  Rare: "0 0 8px #0070dd55",
  Epic: "0 0 10px #a335ee55",
  Legendary: "0 0 12px #ff800066, 0 0 24px #ff800033",
};

const skillItems: SkillItem[] = [
  // Game Engineering
  {
    id: "combat", name: "Vorpal Blade", icon: "⚔️", rarity: "Legendary",
    type: "Weapon — Server Authority", category: "game",
    passive: "All combat is validated server-side. Exploiters deal 0 damage.",
    stats: [
      { label: "DMG", value: "Server-auth" },
      { label: "SPD", value: "60 tick/s" },
      { label: "CRIT", value: "Frame-perfect" },
    ],
    lore: "FSMs for character states, guard/parry timing windows, I-frames and punish windows across the network.",
  },
  {
    id: "ui", name: "Crystal Prism", icon: "🖼️", rarity: "Epic",
    type: "Offhand — UI Architecture", category: "game",
    passive: "Reactive UI auto-updates when state changes. Zero re-renders wasted.",
    stats: [
      { label: "FPS", value: "Stable 60" },
      { label: "Framework", value: "Vide+Charm" },
      { label: "Input", value: "Cross-plat" },
    ],
    lore: "Component-based reactive UI with Vide and Charm state management. Seamless PC, Mobile, Console input.",
  },
  {
    id: "network", name: "Aether Link", icon: "🌐", rarity: "Legendary",
    type: "Trinket — Networking", category: "game",
    passive: "Binary ByteBuffers compress payloads. RollingKeyStone blocks replay attacks.",
    stats: [
      { label: "Bandwidth", value: "-80%" },
      { label: "Security", value: "LCG Rolling" },
      { label: "Latency", value: "Minimal" },
    ],
    lore: "Custom ByteBuffer serialization and RollingKeyStone anti-replay built for Grand Line Chronicles.",
  },
  {
    id: "ai", name: "Mind Shard", icon: "🧠", rarity: "Rare",
    type: "Helm — AI Systems", category: "game",
    passive: "NPC decisions run on throttled loops. Movement interpolates smoothly.",
    stats: [
      { label: "AI Type", value: "LLM+BT" },
      { label: "Perf", value: "Throttled" },
      { label: "Ownership", value: "Safe" },
    ],
    lore: "Performance-first AI with decision-making and movement split. Experimenting with LLM-driven NPCs.",
  },
  {
    id: "memory", name: "Void Siphon", icon: "💾", rarity: "Rare",
    type: "Ring — Memory Mgmt", category: "game",
    passive: "Prevents memory leaks. All connections auto-disconnect on destroy.",
    stats: [
      { label: "GC", value: "Weak refs" },
      { label: "Cleanup", value: "Trove" },
      { label: "Profiling", value: "Active" },
    ],
    lore: "Trove/Janitor cleanup, Lua weak table caches, and strict connection lifecycle management.",
  },
  {
    id: "data", name: "Ironclad Vault", icon: "🗄️", rarity: "Epic",
    type: "Chest — Data Persistence", category: "game",
    passive: "Session locking ensures zero item duplication across servers.",
    stats: [
      { label: "Lock", value: "Session" },
      { label: "Retry", value: "Backoff" },
      { label: "Schema", value: "Versioned" },
    ],
    lore: "Session-locked datastores prevent profile fights. Graceful retries during outages.",
  },
  // Web Engineering
  {
    id: "php", name: "Elephant's Grimoire", icon: "🐘", rarity: "Epic",
    type: "Spellbook — Backend", category: "web",
    passive: "Laravel MVC architecture with Eloquent ORM for safe DB queries.",
    stats: [
      { label: "Lang", value: "PHP 8" },
      { label: "Framework", value: "Laravel" },
      { label: "Deps", value: "Composer" },
    ],
    lore: "Secure RESTful APIs, structured MVC backend logic, and efficient dependency management.",
  },
  {
    id: "frontend", name: "Reactor Core", icon: "⚛️", rarity: "Rare",
    type: "Wand — Frontend", category: "web",
    passive: "TypeScript strict mode catches bugs at compile time, not at 3AM.",
    stats: [
      { label: "Types", value: "Strict TS" },
      { label: "Style", value: "Tailwind" },
      { label: "Markup", value: "HTML5" },
    ],
    lore: "Reactive interfaces using TypeScript, JS, HTML5 and Tailwind CSS. SEO-friendly semantic structure.",
  },
  // Technical Art
  {
    id: "blender", name: "Sculptor's Chisel", icon: "🧊", rarity: "Uncommon",
    type: "Tool — 3D Modeling", category: "art",
    passive: "Low-poly geometry with perfect UV maps. Minimal VRAM footprint.",
    stats: [
      { label: "Topology", value: "Optimized" },
      { label: "Shading", value: "Flat/Smooth" },
      { label: "UV", value: "Precise" },
    ],
    lore: "Low-poly Blender models with topology optimization and precise UV unwrapping for large grids.",
  },
  {
    id: "aseprite", name: "Pixel Brush", icon: "🎨", rarity: "Uncommon",
    type: "Tool — Texture Art", category: "art",
    passive: "Pixel-perfect textures or smooth flat-shaded maps. Your choice.",
    stats: [
      { label: "Style", value: "Pixel/Flat" },
      { label: "Output", value: "1-bit/Color" },
      { label: "UI", value: "Interactive" },
    ],
    lore: "Aseprite pixel-perfect UI design and stylized smooth textures for 2D and 3D assets.",
  },
];

/* ───── Component ───── */
const Skills = () => {
  const [selectedItem, setSelectedItem] = useState<SkillItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<SkillItem | null>(null);
  const { addXp, unlockAchievement } = useGame();
  const openedCards = useRef<Set<string>>(new Set());

  const handleSlotClick = (item: SkillItem, e: React.MouseEvent) => {
    const isSelecting = selectedItem?.id !== item.id;
    setSelectedItem(isSelecting ? item : null);
    if (isSelecting) {
      addXp(10, e);
      openedCards.current.add(item.id);
      if (openedCards.current.size >= 3) {
        unlockAchievement("detective", e);
      }
    }
  };

  const categoryLabel: Record<string, string> = {
    game: "GAME ENGINEERING",
    web: "WEB FULL-STACK",
    art: "TECHNICAL ART",
  };

  const categories = ["game", "web", "art"] as const;

  const renderTooltip = (item: SkillItem) => (
    <div className="inv-tooltip" onClick={(e) => e.stopPropagation()}>
      <div className="inv-tooltip-header" style={{ color: RARITY_COLORS[item.rarity] }}>
        {item.name}
      </div>
      <div className="inv-tooltip-type">{item.type}</div>
      <div className="inv-tooltip-divider" />
      <div className="inv-tooltip-stats">
        {item.stats.map((s) => (
          <div key={s.label} className="inv-tooltip-stat">
            <span className="inv-tooltip-stat-label">{s.label}</span>
            <span className="inv-tooltip-stat-value">{s.value}</span>
          </div>
        ))}
      </div>
      <div className="inv-tooltip-divider" />
      <div className="inv-tooltip-passive">
        <span style={{ color: "#1eff00" }}>Passive: </span>
        {item.passive}
      </div>
      <div className="inv-tooltip-divider" />
      <div className="inv-tooltip-lore">"{item.lore}"</div>
      <div className="inv-tooltip-rarity" style={{ color: RARITY_COLORS[item.rarity] }}>
        {item.rarity}
      </div>
    </div>
  );

  return (
    <div className="ase-section" id="skills">
      <div className="ase-separator">// INVENTORY</div>

      {categories.map((cat) => {
        const items = skillItems.filter((i) => i.category === cat);
        return (
          <div key={cat} style={{ marginBottom: 24 }}>
            <div className="inv-category-label">
              {categoryLabel[cat]}
            </div>
            <div className="inv-grid">
              {items.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const isHovered = hoveredItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`inv-slot ${isSelected ? "inv-slot-selected" : ""}`}
                    style={{
                      borderColor: isSelected
                        ? RARITY_COLORS[item.rarity]
                        : isHovered
                        ? RARITY_COLORS[item.rarity] + "88"
                        : undefined,
                      boxShadow: isSelected ? RARITY_GLOW[item.rarity] : undefined,
                    }}
                    onClick={(e) => handleSlotClick(item, e)}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className="inv-slot-icon">{item.icon}</span>
                    <div
                      className="inv-slot-rarity-bar"
                      style={{ background: RARITY_COLORS[item.rarity] }}
                    />
                    {(isHovered || isSelected) && renderTooltip(item)}
                  </div>
                );
              })}
              {/* Empty slots to fill the grid row */}
              {Array.from({ length: Math.max(0, 6 - items.length) }).map((_, i) => (
                <div key={`empty-${cat}-${i}`} className="inv-slot inv-slot-empty" />
              ))}
            </div>
          </div>
        );
      })}

      {/* Selected Item Detail Panel */}
      {selectedItem && (
        <div className="ase-card" style={{ borderColor: RARITY_COLORS[selectedItem.rarity], marginTop: 16 }}>
          <div
            className="ase-card-title"
            style={{ background: RARITY_COLORS[selectedItem.rarity] + "33", color: RARITY_COLORS[selectedItem.rarity] }}
          >
            <span>{selectedItem.icon}</span>
            {selectedItem.name}
            <span style={{ marginLeft: "auto", opacity: 0.8, fontSize: 9 }}>
              {selectedItem.rarity.toUpperCase()}
            </span>
          </div>
          <div className="ase-card-body">
            <p style={{ fontSize: 13, marginBottom: 8 }}>
              <strong style={{ color: RARITY_COLORS[selectedItem.rarity] }}>{selectedItem.type}</strong>
            </p>
            <p style={{ fontSize: 13, marginBottom: 12 }}>{selectedItem.passive}</p>
            <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
              {selectedItem.stats.map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 10, opacity: 0.6, fontFamily: "var(--font-pixel)" }}>{s.label}</div>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: "#fce205" }}>{s.value}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, fontStyle: "italic", opacity: 0.6 }}>
              "{selectedItem.lore}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
