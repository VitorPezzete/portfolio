const tools = [
  { id: "pencil", label: "Pencil (B)", svg: (
    <svg viewBox="0 0 16 16" className="ase-tool-icon" fill="currentColor" shapeRendering="crispEdges">
      <rect x="11" y="1" width="2" height="2"/>
      <rect x="9" y="3" width="2" height="2"/>
      <rect x="7" y="5" width="2" height="2"/>
      <rect x="5" y="7" width="2" height="2"/>
      <rect x="3" y="9" width="2" height="2"/>
      <rect x="1" y="11" width="2" height="4"/>
      <rect x="1" y="13" width="2" height="2"/>
    </svg>
  )},
  { id: "eraser", label: "Eraser (E)", svg: (
    <svg viewBox="0 0 16 16" className="ase-tool-icon" fill="currentColor" shapeRendering="crispEdges">
      <rect x="3" y="2" width="10" height="2"/>
      <rect x="4" y="4" width="8" height="6"/>
      <rect x="3" y="10" width="10" height="2"/>
      <rect x="2" y="12" width="12" height="2"/>
    </svg>
  )},
  { id: "bucket", label: "Paint Bucket (G)", svg: (
    <svg viewBox="0 0 16 16" className="ase-tool-icon" fill="currentColor" shapeRendering="crispEdges">
      <rect x="6" y="1" width="2" height="2"/>
      <rect x="4" y="3" width="2" height="2"/>
      <rect x="2" y="5" width="4" height="2"/>
      <rect x="2" y="7" width="6" height="2"/>
      <rect x="4" y="9" width="6" height="2"/>
      <rect x="6" y="11" width="4" height="2"/>
      <rect x="10" y="7" width="4" height="4"/>
      <rect x="12" y="5" width="2" height="2"/>
    </svg>
  )},

  { id: "eyedropper", label: "Eyedropper (I)", svg: (
    <svg viewBox="0 0 16 16" className="ase-tool-icon" fill="currentColor" shapeRendering="crispEdges">
      <rect x="10" y="1" width="3" height="3"/>
      <rect x="8" y="4" width="2" height="2"/>
      <rect x="6" y="6" width="2" height="2"/>
      <rect x="4" y="8" width="2" height="2"/>
      <rect x="2" y="10" width="2" height="2"/>
      <rect x="1" y="12" width="2" height="2"/>
    </svg>
  )},
  { id: "hand", label: "Hand (H)", svg: (
    <svg viewBox="0 0 16 16" className="ase-tool-icon" fill="currentColor" shapeRendering="crispEdges">
      <rect x="5" y="1" width="2" height="6"/>
      <rect x="7" y="2" width="2" height="6"/>
      <rect x="9" y="3" width="2" height="6"/>
      <rect x="11" y="5" width="2" height="4"/>
      <rect x="3" y="7" width="2" height="4"/>
      <rect x="3" y="11" width="10" height="3"/>
    </svg>
  )},
  { id: "zoom", label: "Zoom (Z)", svg: (
    <svg viewBox="0 0 16 16" className="ase-tool-icon" fill="currentColor" shapeRendering="crispEdges">
      <rect x="4" y="2" width="5" height="1"/>
      <rect x="3" y="3" width="1" height="5"/>
      <rect x="9" y="3" width="1" height="5"/>
      <rect x="4" y="8" width="5" height="1"/>
      <rect x="9" y="9" width="2" height="2"/>
      <rect x="11" y="11" width="2" height="2"/>
      <rect x="13" y="13" width="1" height="1"/>
    </svg>
  )},
];

interface ToolbarProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
}

const Toolbar = ({ activeTool, setActiveTool }: ToolbarProps) => {
  return (
    <div className="ase-toolbar">
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`ase-tool-btn ${activeTool === tool.id ? "active" : ""}`}
          title={tool.label}
          onClick={() => setActiveTool(tool.id)}
        >
          {tool.svg}
        </button>
      ))}

      <div style={{ flex: 1 }} />

      {/* FG/BG Color Pair */}
      <div className="ase-color-pair">
        <div className="ase-color-fg" />
        <div className="ase-color-bg" />
      </div>
    </div>
  );
};

export default Toolbar;
