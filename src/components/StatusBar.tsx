import { useEffect, useState } from "react";

interface StatusBarProps {
  customMessage?: string;
  zoom?: number;
}

const StatusBar = ({ customMessage, zoom = 1 }: StatusBarProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="ase-statusbar">
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
