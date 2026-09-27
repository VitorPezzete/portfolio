import { useState } from "react";

const projects = [
  {
    title: "Grand Line Chronicles",
    file: "glc.rbxl",
    description:
      "Built the entire codebase solo: combat, magic, inventory, quests, and AI. Engineered an authoritative server environment that completely mitigated combat exploits while keeping client hit-registration buttery smooth.",
    tags: ["Luau", "Vide", "Rojo", "Wally"],
    githubLink: "https://github.com/VitorPezzete/Grand-Line-Chronicles",
    details: [
      "Authoritative Combat: Server verifies all hits, distances, and cooldowns. Client predictions ensure instantaneous local feedback.",
      "Magic & Abilities System: Modular ability framework where adding a new spell requires zero boilerplate. Data-driven design using strict Luau types.",
      "Inventory & Persistence: Rock-solid inventory system hooked into a session-locked datastore to prevent item cloning during server crashes.",
    ],
  },
  {
    title: "Runeborn",
    file: "runeborn.rbxl",
    description:
      "Implemented all core UI systems using Charm for state management. Wrote the underlying UI framework that decoupled visual components from game logic, allowing for rapid iteration on menus and HUD.",
    tags: ["UI/UX", "Charm", "React-style"],
    details: [
      "State-Driven UI: Used Charm (atomic state management) to ensure the UI is a strict function of state.",
      "Componentization: Built reusable widgets (buttons, modals, sliders) that the rest of the team could plug and play.",
      "Performance: Aggressive batching of UI updates for 60fps on low-end mobile.",
    ],
  },
  {
    title: "Adventure Story Retold",
    file: "asr.rbxl",
    description:
      "Led the reverse-engineering and modernization of legacy combat systems. Refactored thousands of lines of spaghetti code into a clean, testable Service/Controller architecture.",
    tags: ["Refactoring", "Architecture", "Optimization"],
    link: "https://www.roblox.com/games/16317617717/Adventure-Story-Retold-April-Fools",
    githubLink: "https://github.com/VitorPezzete/Adventure-Story-Retold",
    details: [
      "Architecture Overhaul: Migrated loose scripts into rigorous Service/Controller pattern with Dependency Injection.",
      "Performance Optimization: Eliminated severe memory leaks from lingering connections in old combat scripts.",
      "Modernization: Introduced Rojo, Wally, and strict typing to a previously unmanaged codebase.",
    ],
  },
];

const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="ase-section" id="projects">
      <div className="ase-separator">// FEATURED PROJECTS</div>

      {projects.map((project, index) => (
        <div
          key={index}
          className="ase-card ase-card-clickable"
          onClick={() =>
            setExpandedIndex(expandedIndex === index ? null : index)
          }
          style={
            expandedIndex === index
              ? { borderColor: "var(--color-ase-selected)" }
              : {}
          }
        >
          <div
            className="ase-card-title"
            style={
              expandedIndex === index
                ? { background: "var(--color-ase-selected)" }
                : {}
            }
          >
            <span>📁</span>
            {project.file}
            <span style={{ marginLeft: "auto", fontSize: 9, opacity: 0.8 }}>
              {project.title}
            </span>
          </div>
          <div className="ase-card-body">
            <p style={{ marginBottom: 12 }}>{project.description}</p>

            {/* Tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                marginBottom: expandedIndex === index ? 16 : 0,
              }}
            >
              {project.tags.map((tag) => (
                <span key={tag} className="ase-tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Expanded details */}
            {expandedIndex === index && (
              <>
                <ul
                  style={{
                    paddingLeft: 16,
                    fontSize: 13,
                    lineHeight: 1.5,
                    marginBottom: 16,
                  }}
                >
                  {project.details.map((detail, di) => (
                    <li key={di} style={{ marginBottom: 6 }}>
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="ase-btn"
                      onClick={(e) => e.stopPropagation()}
                      style={{ textDecoration: "none" }}
                    >
                      📂 View Source
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="ase-btn ase-btn-primary"
                      onClick={(e) => e.stopPropagation()}
                      style={{ textDecoration: "none" }}
                    >
                      ▶ Play on Roblox
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
