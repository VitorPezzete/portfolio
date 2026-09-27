import { useState } from "react";

const strengths = [
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

const skillTags = [
  "Luau (--!strict)",
  "roblox-ts / TypeScript",
  "Vide & Charm",
  "Service/Controller DI",
  "Rojo + Wally",
  "StyLua / Selene",
];

const Skills = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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

      <div className="ase-separator">// CORE ENGINEERING STRENGTHS</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8, alignItems: "start" }}>
        {strengths.map((item, index) => (
          <div
            key={index}
            className={`ase-card ase-card-clickable`}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            style={expandedIndex === index ? { borderColor: "var(--color-ase-selected)" } : {}}
          >
            <div
              className="ase-card-title"
              style={
                expandedIndex === index
                  ? { background: "var(--color-ase-selected)" }
                  : {}
              }
            >
              <span>{item.icon}</span>
              {item.title}
            </div>
            <div className="ase-card-body">
              <p style={{ fontSize: 13, marginBottom: expandedIndex === index ? 12 : 0 }}>
                {item.shortDesc}
              </p>
              {expandedIndex === index && (
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
        ))}
      </div>
    </div>
  );
};

export default Skills;
