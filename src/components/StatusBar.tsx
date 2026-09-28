import { useEffect, useState } from "react";
import { useGame } from "../contexts/GameContext";

interface StatusBarProps {
  customMessage?: string;
  zoom?: number;
}

const StatusBar = ({ customMessage, zoom = 1 }: StatusBarProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { level, xpInLevel, xpToNext, isLevelingUp, unlockedAchievements } = useGame();

  const xpPercent = Math.min((xpInLevel / xpToNext) * 100, 100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="ase-statusbar">
      <span
        className="ase-statusbar-item"
        style={{
          color: isLevelingUp ? "#fff" : "#fce205",
          fontWeight: "bold",
          transition: "color 0.3s",
        }}
      >
        LVL {level}
      </span>
      <span
        className="ase-statusbar-item"
        style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 130 }}
      >
        <span style={{ color: "#fce205", fontSize: 10 }}>XP</span>
        <div
          style={{
            flex: 1,
            height: 10,
            background: "var(--color-ase-face)",
            border: "1px solid var(--color-ase-border-dark)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${xpPercent}%`,
              height: "100%",
              background: isLevelingUp
                ? "linear-gradient(90deg, #fce205, #ff6b6b, #fce205)"
                : "#fce205",
              transition: "width 0.4s ease, background 0.3s",
              backgroundSize: isLevelingUp ? "200% 100%" : undefined,
              animation: isLevelingUp ? "shimmer 0.5s infinite" : undefined,
            }}
          />
        </div>
        <span style={{ fontSize: 9, color: "var(--color-ase-text)", opacity: 0.7, minWidth: 45 }}>
          {xpInLevel}/{xpToNext}
        </span>
      </span>
      <span className="ase-statusbar-item" style={{ fontSize: 10, opacity: 0.6 }}>
        🏆 {unlockedAchievements.size}/10
      </span>
      <span className="ase-statusbar-item">
        {mousePos.x}, {mousePos.y}
      </span>
      <span className="ase-statusbar-item">
        Zoom: {(zoom * 100).toFixed(0)}%
      </span>
      <span className="ase-statusbar-item" style={{ flex: 1, paddingLeft: 12 }}>
        {customMessage || "RGB"}
      </span>
      <span className="ase-statusbar-item">
        szortks-portfolio.aseprite
      </span>
    </div>
  );
};

export default StatusBar;
