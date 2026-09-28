import { useEffect, useState } from "react";
import { useGame } from "../contexts/GameContext";

interface StatusBarProps {
  customMessage?: string;
  zoom?: number;
}

const StatusBar = ({ customMessage, zoom = 1 }: StatusBarProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { level, xp } = useGame();
  
  const xpPercent = xp % 100;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="ase-statusbar">
      <span className="ase-statusbar-item" style={{ color: "#fce205", fontWeight: "bold" }}>
        LVL {level}
      </span>
      <span className="ase-statusbar-item" style={{ display: "flex", alignItems: "center", gap: 4, width: 120 }}>
        XP
        <div style={{ flex: 1, height: 10, background: "var(--color-ase-face)", border: "1px solid var(--color-ase-border-dark)", position: "relative" }}>
          <div style={{ width: `${xpPercent}%`, height: "100%", background: "#fce205", transition: "width 0.3s ease" }} />
        </div>
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
