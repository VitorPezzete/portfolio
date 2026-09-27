import { useState } from "react";

// 1-BIT 4AM Palette
const PALETTE_COLORS = [
  "transparent",
  "var(--color-dark)",
  "var(--color-light)",
];

const ColorPalette = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  return (
    <div className="ase-palette">
      <div className="ase-palette-grid">
        {PALETTE_COLORS.map((color, i) => (
          <div
            key={i}
            className={`ase-palette-swatch ${selectedColor === i ? "selected" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(i)}
            onMouseEnter={() => setHoveredColor(color)}
            onMouseLeave={() => setHoveredColor(null)}
            title={color}
          />
        ))}
      </div>
      {hoveredColor && (
        <div
          style={{
            marginTop: 8,
            padding: "4px 6px",
            background: "var(--color-ase-tooltip)",
            border: "1px solid var(--color-ase-border-dark)",
            fontSize: 11,
            fontFamily: "var(--font-pixel-body)",
            textAlign: "center",
          }}
        >
          {hoveredColor}
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
