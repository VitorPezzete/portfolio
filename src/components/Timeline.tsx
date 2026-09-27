import type { Section } from "./MenuBar";

interface TimelineProps {
  sections: Section[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

const Timeline = ({ sections, activeSection, onNavigate }: TimelineProps) => {
  return (
    <div className="ase-timeline">
      {/* Layer labels */}
      <div className="ase-timeline-layers">
        <div className="ase-timeline-layer" style={{ background: "var(--color-ase-face)" }}>
          <svg viewBox="0 0 12 12" className="ase-timeline-layer-icon" fill="currentColor" shapeRendering="crispEdges">
            <rect x="1" y="1" width="10" height="2"/>
            <rect x="1" y="1" width="2" height="10"/>
            <rect x="9" y="1" width="2" height="10"/>
            <rect x="1" y="9" width="10" height="2"/>
          </svg>
          <span>Content</span>
        </div>
        <div className="ase-timeline-layer" style={{ background: "var(--color-ase-face)" }}>
          <svg viewBox="0 0 12 12" className="ase-timeline-layer-icon" fill="currentColor" shapeRendering="crispEdges">
            <rect x="2" y="5" width="8" height="2"/>
            <rect x="5" y="2" width="2" height="8"/>
          </svg>
          <span>BG</span>
        </div>
      </div>

      {/* Frame columns */}
      <div className="ase-timeline-frames">
        {sections.map((section, i) => (
          <div key={section.id} className="ase-timeline-col">
            <div
              className={`ase-timeline-header ${activeSection === section.id ? "active" : ""}`}
              onClick={() => onNavigate(section.id)}
            >
              {i + 1}
            </div>
            <div
              className={`ase-timeline-cell ${activeSection === section.id ? "active" : ""}`}
              onClick={() => onNavigate(section.id)}
            >
              {activeSection === section.id && (
                <div style={{
                  width: 6,
                  height: 6,
                  background: "var(--color-ase-canvas-light)",
                  border: "1px solid var(--color-ase-border)",
                }} />
              )}
            </div>
            <div className="ase-timeline-cell" />
          </div>
        ))}

        {/* Extra empty frames for visual padding */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`empty-${i}`} className="ase-timeline-col" style={{ opacity: 0.4 }}>
            <div className="ase-timeline-header">
              {sections.length + i + 1}
            </div>
            <div className="ase-timeline-cell" />
            <div className="ase-timeline-cell" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
