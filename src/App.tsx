import { useCallback, useEffect, useRef, useState } from "react";
import { useGame } from "./contexts/GameContext";
import MenuBar from "./components/MenuBar";
import type { Section } from "./components/MenuBar";
import Toolbar from "./components/Toolbar";
import ColorPalette from "./components/ColorPalette";
import Timeline from "./components/Timeline";
import StatusBar from "./components/StatusBar";

import TabPortfolio from "./components/TabPortfolio";
import TabDevlog from "./components/TabDevlog";
import TabCommissions from "./components/TabCommissions";

const sections: Section[] = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const THEMES = [
  { dark: "#32292f", light: "#e1d3c1", name: "4AM (Sepia)" },
  { dark: "#081820", light: "#e0f8d0", name: "Gameboy" },
  { dark: "#000000", light: "#ffffff", name: "Mac Classic" },
  { dark: "#220000", light: "#ff0000", name: "Virtual Boy" },
];

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [activeTab, setActiveTab] = useState("portfolio.ase");
  const [activeTool, setActiveTool] = useState("pencil");
  const [themeIndex, setThemeIndex] = useState(0);
  const [zenMode, setZenMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");
  
  const { addXp, unlockAchievement } = useGame();
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set(["portfolio.ase"]));
  const [themeChanges, setThemeChanges] = useState(0);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Drag to scroll state
  const isDragging = useRef(false);
  const startDragPos = useRef({ x: 0, y: 0 });
  const startScrollPos = useRef({ top: 0, left: 0 });

  const handleNavigate = useCallback((id: string) => {
    setActiveTab("portfolio.ase");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el && canvasRef.current) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  }, []);

  // IntersectionObserver to track active section in the portfolio tab
  useEffect(() => {
    if (activeTab !== "portfolio.ase") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { root: canvas, threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
    );

    const sectionEls = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    for (const el of sectionEls) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, [activeTab]);

  // Handle global mouse up for dragging
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
      if (activeTool === "hand" && canvasRef.current) {
        canvasRef.current.style.cursor = "grab";
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [activeTool]);

  // Tool handlers on Canvas Container
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (activeTool === "hand" && canvasRef.current) {
      isDragging.current = true;
      startDragPos.current = { x: e.clientX, y: e.clientY };
      startScrollPos.current = {
        top: canvasRef.current.scrollTop,
        left: canvasRef.current.scrollLeft,
      };
      canvasRef.current.style.cursor = "grabbing";
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (activeTool === "hand" && isDragging.current && canvasRef.current) {
      const dx = e.clientX - startDragPos.current.x;
      const dy = e.clientY - startDragPos.current.y;
      canvasRef.current.scrollTop = startScrollPos.current.top - dy;
      canvasRef.current.scrollLeft = startScrollPos.current.left - dx;
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    if (activeTool === "bucket") {
      setThemeIndex((prev) => (prev + 1) % THEMES.length);
      setStatusMessage(`Theme filled: ${THEMES[(themeIndex + 1) % THEMES.length].name}`);
      addXp(15, e);
      unlockAchievement("pixel_artist", e);
      const newCount = themeChanges + 1;
      setThemeChanges(newCount);
      if (newCount >= 3) unlockAchievement("time_traveler", e);
    } else if (activeTool === "eraser") {
      setZenMode((prev) => !prev);
      setStatusMessage(zenMode ? "Zen Mode deactivated." : "Zen Mode activated.");
      addXp(15, e);
      unlockAchievement("zen_master", e);
    } else if (activeTool === "zoom") {
      e.preventDefault();
      setZoomLevel((prev) => Math.min(prev + 0.25, 2));
      setStatusMessage(`Zoom: ${(Math.min(zoomLevel + 0.25, 2) * 100).toFixed(0)}%`);
      addXp(5, e);
    } else if (activeTool === "eyedropper") {
      navigator.clipboard.writeText(window.location.href);
      setStatusMessage("Copied portfolio URL to clipboard!");
      addXp(50, e);
      unlockAchievement("link_sharer", e);
    }
  };

  const handleContentContextMenu = (e: React.MouseEvent) => {
    if (activeTool === "zoom") {
      e.preventDefault();
      setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
      setStatusMessage(`Zoom: ${(Math.max(zoomLevel - 0.25, 0.5) * 100).toFixed(0)}%`);
    }
  };

  const getCursor = () => {
    switch (activeTool) {
      case "hand": return "grab";
      case "zoom": return "zoom-in";
      case "bucket": return "crosshair";
      case "eyedropper": return "crosshair";
      case "eraser": return "cell";
      default: return "default";
    }
  };

  const themeVars = {
    "--color-dark": THEMES[themeIndex].dark,
    "--color-light": THEMES[themeIndex].light,
  } as React.CSSProperties;

  return (
    <div className="ase-layout" style={themeVars}>
      {/* Menu Bar */}
      {!zenMode && <MenuBar sections={sections} onNavigate={handleNavigate} />}

      {/* Toolbar */}
      {!zenMode && <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />}

      {/* Canvas Area with Tabs */}
      <div 
        className="ase-tabs-container" 
        style={{ 
          gridArea: zenMode ? "1 / 1 / -1 / -1" : "canvas",
          zIndex: 10
        }}
      >
        {/* Tabs Bar */}
        {!zenMode && (
          <div className="ase-tabs">
            <div 
              className={`ase-tab ${activeTab === "portfolio.ase" ? "active" : ""}`}
              onClick={(e) => {
                setActiveTab("portfolio.ase");
                addXp(10, e);
                const next = new Set(visitedTabs).add("portfolio.ase");
                setVisitedTabs(next);
                if (next.size >= 3) unlockAchievement("navigator", e);
              }}
            >
              <span style={{ fontSize: 10 }}>📄</span> portfolio.ase
            </div>
            <div 
              className={`ase-tab ${activeTab === "devlog.ase" ? "active" : ""}`}
              onClick={(e) => {
                setActiveTab("devlog.ase");
                addXp(10, e);
                const next = new Set(visitedTabs).add("devlog.ase");
                setVisitedTabs(next);
                if (next.size >= 3) unlockAchievement("navigator", e);
              }}
            >
              <span style={{ fontSize: 10 }}>📝</span> devlog.ase
            </div>
            <div 
              className={`ase-tab ${activeTab === "commissions.ase" ? "active" : ""}`}
              onClick={(e) => {
                setActiveTab("commissions.ase");
                addXp(10, e);
                unlockAchievement("window_shopper", e);
                const next = new Set(visitedTabs).add("commissions.ase");
                setVisitedTabs(next);
                if (next.size >= 3) unlockAchievement("navigator", e);
              }}
            >
              <span style={{ fontSize: 10 }}>💼</span> commissions.ase
            </div>
          </div>
        )}

        {/* Canvas Inner Content */}
        <div 
          className="ase-canvas" 
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          style={{ cursor: getCursor() }}
        >
          <div 
            className="ase-canvas-inner"
            onClick={handleContentClick}
            onContextMenu={handleContentContextMenu}
            style={{ 
              transform: `scale(${zoomLevel})`, 
              transformOrigin: "top center",
              transition: "transform 0.1s steps(4)"
            }}
          >
            {activeTab === "portfolio.ase" && <TabPortfolio />}
            {activeTab === "devlog.ase" && <TabDevlog />}
            {activeTab === "commissions.ase" && <TabCommissions />}
          </div>
        </div>
      </div>

      {/* Color Palette */}
      {!zenMode && <ColorPalette />}

      {/* Timeline */}
      {!zenMode && (
        <Timeline
          sections={sections}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      )}

      {/* Status Bar */}
      {!zenMode && <StatusBar customMessage={statusMessage} zoom={zoomLevel} />}
    </div>
  );
}

export default App;
