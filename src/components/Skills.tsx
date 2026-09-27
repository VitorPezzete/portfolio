import { useState } from "react";

const gameEngineeringStrengths = [
  {
    title: "Server-authoritative combat",
    icon: "⚔️",
    shortDesc: "FSMs for character states, guard/parry timing windows, I-frames...",
    details: [
      "Finite State Machines (FSM): Cleanly isolate character states (Idle, Attacking, Stunned, Blocking).",
      "Guard/Parry Windows: Frame-perfect timing verification with latency compensation.",
      "I-frames & Punish Windows: Safely managing invincibility across the network.",
    ],
  },
  {
    title: "Client-side & UI architecture",
    icon: "🖼️",
    shortDesc: "Reactive, component-based UI with Vide and Charm state...",
    details: [
      "Vide & Charm: Pure reactive UI components that auto-update when state changes.",
      "Cross-platform Input: Seamless PC, Mobile, and Console input handling.",
      "HUD & Inventory: Rapid-update UI with zero lag.",
    ],
  },
  {
    title: "Networking & replication",
    icon: "🌐",
    shortDesc: "Binary ByteBuffers for compact payloads, VFX sync...",
    details: [
      "Binary ByteBuffers: Compressing payloads into bytes to save bandwidth.",
      "VFX Sync: Offloading effects to clients with server-side triggers.",
      "Schema Validation: Strict validation blocks malformed exploiter data.",
    ],
  },
  {
    title: "NPC & AI systems",
    icon: "🧠",
    shortDesc: "Performance-first AI, decision-making and movement split...",
    details: [
      "Throttled Update Loops: Decision making runs slowly, movement interpolation runs fast.",
      "Network Ownership: Safe ownership assignment to prevent NPC stutter.",
      "LLM-driven NPCs: Experimenting with generative AI for dynamic dialogue.",
    ],
  },
  {
    title: "Memory management",
    icon: "💾",
    shortDesc: "Trove/Janitor cleanup, weak tables for caches...",
    details: [
      "Trove/Janitor: Strict lifecycle management with auto-disconnection.",
      "Weak Tables: Using Lua's __mode for GC-friendly caching.",
      "Connection Lifecycles: Profiling and hunting down runaway threads.",
    ],
  },
  {
    title: "Data persistence",
    icon: "🗄️",
    shortDesc: "Session-locked datastores, no profile fights between servers...",
    details: [
      "Session Locking: Preventing item duplication by ensuring single-server writes.",
      "Retry & Backoff: Graceful caching and retries during datastore outages.",
      "Versioned Schemas: Safe migration of old player saves to new formats.",
    ],
  },
];

const webEngineeringStrengths = [
  {
    title: "PHP & Laravel Ecosystem",
    icon: "🐘",
    shortDesc: "Secure RESTful APIs, MVC architecture, and Composer...",
    details: [
      "Laravel MVC: Structured backend logic for scalable web applications.",
      "Composer: Efficient package and dependency management.",
      "Database & ORM: Safe and performant querying with Eloquent.",
    ],
  },
  {
    title: "Modern Frontend",
    icon: "⚛️",
    shortDesc: "Reactive interfaces using TypeScript, JS, HTML5 and Tailwind...",
    details: [
      "TypeScript & JS: Strict type checking and modern ES6+ features.",
      "Tailwind CSS: Rapid prototyping with utility-first responsive styling.",
      "Semantic HTML5: Accessible and SEO-friendly document structure.",
    ],
  }
];

const techArtStrengths = [
  {
    title: "3D Modeling & UV Mapping",
    icon: "🧊",
    shortDesc: "Low-poly Blender models tailored for high-performance...",
    details: [
      "Topology Optimization: Creating extremely efficient low-poly geometry.",
      "Smooth vs Flat Shading: Custom normals and rendering setups.",
      "UV Unwrapping: Precise texture mapping across large surface grids.",
    ],
  },
  {
    title: "Pixel Art & Textures",
    icon: "🎨",
    shortDesc: "Aseprite pixel-perfect UI and stylized smooth textures...",
    details: [
      "Aseprite Textures: Generating retro 1-bit or full color maps.",
      "Smooth Large-Grid Textures: Scaling art without obvious pixelation.",
      "UI/UX Design: Bridging the gap between code and interactive visual aesthetics.",
    ],
  }
];

const skillTags = [
  "Luau (--!strict)",
  "PHP & Laravel",
  "TypeScript / JS",
  "Tailwind CSS",
  "HTML5 & CSS3",
  "Vide & Charm",
  "Rojo + Wally",
  "Blender",
  "Aseprite",
];

const Skills = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const renderCards = (items: typeof gameEngineeringStrengths, categoryPrefix: string) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8, alignItems: "start", marginBottom: 32 }}>
      {items.map((item, index) => {
        const id = `${categoryPrefix}-${index}`;
        return (
          <div
            key={id}
            className={`ase-card ase-card-clickable`}
            onClick={() => setExpandedId(expandedId === id ? null : id)}
            style={expandedId === id ? { borderColor: "var(--color-ase-selected)" } : {}}
          >
            <div
              className="ase-card-title"
              style={
                expandedId === id
                  ? { background: "var(--color-ase-selected)" }
                  : {}
              }
            >
              <span>{item.icon}</span>
              {item.title}
            </div>
            <div className="ase-card-body">
              <p style={{ fontSize: 13, marginBottom: expandedId === id ? 12 : 0 }}>
                {item.shortDesc}
              </p>
              {expandedId === id && (
                <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.5 }}>
                  {item.details.map((detail, di) => (
                    <li key={di} style={{ marginBottom: 6 }}>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="ase-section" id="skills">
      <div className="ase-separator">// STACK & TOOLING</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
        {skillTags.map((skill) => (
          <span key={skill} className="ase-tag ase-tag-primary">
            {skill}
          </span>
        ))}
      </div>

      <div className="ase-separator">// ROBLOX CORE ENGINEERING</div>
      {renderCards(gameEngineeringStrengths, "game")}

      <div className="ase-separator">// WEB FULL-STACK & BACKEND</div>
      {renderCards(webEngineeringStrengths, "web")}

      <div className="ase-separator">// TECHNICAL ART & MODELING</div>
      {renderCards(techArtStrengths, "art")}
    </div>
  );
};

export default Skills;
