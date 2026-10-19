import { useState } from "react";
import { TRACKS, formatSeconds, trackSrc } from "../music";

const projects = [
  {
    title: "One Piece: Divine",
    file: "opd.rbxl",
    description:
      "Rebuilt a live One Piece game with over 2.3 million visits from the ground up, as its solo programmer: more than 1,300 Luau modules replacing the old per-fruit scripts with one server-authoritative framework, with every player's data carried over.",
    tags: ["Luau", "Knit", "Fusion", "Rojo", "Wally"],
    link: "https://www.roblox.com/games/112233665771826/One-Piece-Divine",
    githubLink: "https://github.com/VitorPezzete/OPD-Revamp",
    details: [
      "Authoritative Abilities: 48 devil fruits run through a single validated input path. The client sends only a slot, a press and an aim point; the server resolves ownership, level gates, cooldowns and charge time.",
      "Two Interfaces, One Codebase: A new UI and a faithful rebuild of the legacy one, switchable in settings, with gamepad support and touch controls players can move, resize and rebind.",
      "Live Operations: Session-locked saves with daily backups, migration of legacy player data, per-place service manifests for the main, raid and AFK places, anti-exploit checks and staff tooling.",
    ],
  },
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
  {
    title: "Haywood Valley",
    file: "haywood.rbxl",
    description:
      "A top-down pixel-art farming game in development, written in roblox-ts. The world is a 2D scene assembled inside Roblox's 3D engine: sprites on camera-facing cards, a fixed three-quarter camera and whole-pixel scaling.",
    tags: ["roblox-ts", "Flamework", "Charm", "Vide"],
    images: [
      { src: "/projects/haywood/house-day.jpg", alt: "The player's house at noon" },
      { src: "/projects/haywood/house-night.jpg", alt: "The same house at night, lit by the fireplace and a wall torch" },
      { src: "/projects/haywood/island.jpg", alt: "A small island in the open sea" },
      { src: "/projects/haywood/residents.jpg", alt: "Residents standing, sitting and sleeping" },
      { src: "/projects/haywood/customize.jpg", alt: "The character customization screen" },
    ],
    imageCredit: "Interior tiles by Aeko; character pieces by the Haywood Valley contributors.",
    tracks: TRACKS,
    details: [
      "2D World in a 3D Engine: Ground and objects are SurfaceGui sprites sorted by their distance to a fixed camera, with the zoom locked to whole multiples of the art pixel.",
      "Layered Characters: Each player is drawn from up to 19 tinted sprite layers. The look travels as a compact string that the server validates against the wardrobe catalog.",
      "Pixel-Perfect UI: Interface built in Vide on a 480x270 art canvas scaled by an integer factor, with nine-sliced panels generated by script.",
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

                {/* Screenshots */}
                {project.images && (
                  <div style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: 8,
                      }}
                    >
                      {project.images.map((image) => (
                        <a
                          key={image.src}
                          href={image.src}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            title={image.alt}
                            loading="lazy"
                            style={{
                              width: "100%",
                              display: "block",
                              imageRendering: "pixelated",
                              border: "1px solid var(--color-ase-selected)",
                            }}
                          />
                        </a>
                      ))}
                    </div>
                    {project.imageCredit && (
                      <p style={{ fontSize: 11, opacity: 0.7, marginTop: 6 }}>
                        {project.imageCredit}
                      </p>
                    )}
                  </div>
                )}

                {/* Soundtrack */}
                {project.tracks && (
                  <div style={{ marginBottom: 16 }} onClick={(e) => e.stopPropagation()}>
                    <p style={{ fontSize: 13, marginBottom: 8 }}>
                      <strong>Soundtrack:</strong> original music I composed for the game, played on
                      orchestral woodwinds in Ableton Live. The main theme has one arrangement per time
                      of day, so the game can crossfade between them as the hours pass.
                    </p>
                    {[...new Set(project.tracks.map((t) => t.group))].map((group) => (
                      <div key={group} style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>{group}</div>
                        {project.tracks!.filter((t) => t.group === group).map((track) => (
                          <div
                            key={track.id}
                            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px", marginBottom: 6 }}
                          >
                            <span style={{ fontSize: 13, minWidth: 150, flex: "1 1 150px" }}>
                              {track.title}{" "}
                              <span style={{ opacity: 0.7, fontSize: 11 }}>
                                {formatSeconds(track.seconds)} · {track.note}
                              </span>
                            </span>
                            <audio
                              controls
                              preload="none"
                              src={trackSrc(track)}
                              style={{ flex: "1 1 220px", minWidth: 0, maxWidth: "100%", height: 32 }}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

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
