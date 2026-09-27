import { useCallback, useEffect, useRef, useState } from "react";

export interface Section {
  id: string;
  label: string;
}

interface MenuBarProps {
  sections: Section[];
  onNavigate: (id: string) => void;
}

const MenuBar = ({ sections, onNavigate }: MenuBarProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menus: Record<string, { label: string; action?: () => void }[]> = {
    File: [
      { label: "About Me", action: () => onNavigate("about") },
      { label: "─────────" },
      { label: "Download CV (soon)" },
    ],
    Edit: [
      { label: "Skills & Tools", action: () => onNavigate("skills") },
    ],
    Sprite: [
      ...sections
        .filter((s) => s.id === "projects")
        .map((s) => ({ label: s.label, action: () => onNavigate(s.id) })),
    ],
    View: [
      { label: "All Sections" },
      ...sections.map((s) => ({
        label: s.label,
        action: () => onNavigate(s.id),
      })),
    ],
    Help: [
      { label: "Contact", action: () => onNavigate("contact") },
      { label: "─────────" },
      { label: "GitHub", action: () => window.open("https://github.com/VitorPezzete", "_blank") },
      { label: "Discord: szortk" },
    ],
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpenMenu(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="ase-menubar" ref={menuRef}>
      {Object.entries(menus).map(([name, items]) => (
        <div key={name} style={{ position: "relative" }}>
          <button
            className={`ase-menubar-item ${openMenu === name ? "active" : ""}`}
            onClick={() => setOpenMenu(openMenu === name ? null : name)}
            onMouseEnter={() => openMenu && setOpenMenu(name)}
          >
            {name}
          </button>

          {openMenu === name && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                background: "var(--color-ase-face)",
                border: "2px solid var(--color-ase-border-dark)",
                zIndex: 50,
                minWidth: 160,
                boxShadow: "3px 3px 0px rgba(0,0,0,0.3)",
              }}
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    item.action?.();
                    setOpenMenu(null);
                  }}
                  style={{
                    padding: "4px 16px",
                    fontSize: 13,
                    fontFamily: "var(--font-pixel-body)",
                    cursor: item.action ? "pointer" : "default",
                    color: item.action
                      ? "var(--color-ase-text)"
                      : "var(--color-ase-disabled)",
                    borderBottom:
                      item.label.startsWith("───")
                        ? "none"
                        : undefined,
                    height: item.label.startsWith("───") ? 1 : undefined,
                    background: item.label.startsWith("───")
                      ? "var(--color-ase-border)"
                      : undefined,
                    margin: item.label.startsWith("───")
                      ? "2px 4px"
                      : undefined,
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (item.action) {
                      (e.currentTarget as HTMLDivElement).style.background =
                        "var(--color-ase-menuitem-hot)";
                      (e.currentTarget as HTMLDivElement).style.color =
                        "var(--color-ase-text-selected)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.label.startsWith("───")) {
                      (e.currentTarget as HTMLDivElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLDivElement).style.color =
                        item.action ? "var(--color-ase-text)" : "var(--color-ase-disabled)";
                    }
                  }}
                >
                  {item.label.startsWith("───") ? "" : item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
