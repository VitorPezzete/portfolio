const About = () => {
  return (
    <div className="ase-section" id="about">
      <div className="ase-separator">// ABOUT ME</div>

      <div className="ase-card">
        <div className="ase-card-title">
          <span>📋</span>
          about.txt
        </div>
        <div className="ase-card-body">
          <p style={{ marginBottom: 12 }}>
            Eleven years in Roblox development, split across both ends of the
            stack — server-authoritative systems that decide whether a game holds
            up once real players (and real exploiters) get their hands on it, and
            the client-side UI/UX layer that decides whether any of that is
            pleasant to actually play.
          </p>
          <p>
            I've worked inside existing codebases and I've run solo projects end
            to end, owning everything from an empty Rojo project to a live game
            with its own UI, combat, and persistence.
          </p>
        </div>
      </div>

      {/* Experience & Architecture */}
      <div className="ase-card">
        <div className="ase-card-title">
          <span>⚙️</span>
          experience.lua
        </div>
        <div className="ase-card-body">
          <p style={{ marginBottom: 12 }}>
            Most of my recent work sits at the intersection of strict typing and
            game architecture — strict Luau, architected the way a roblox-ts
            codebase would be (Service/Controller, dependency injection).
          </p>
          <p>
            I prefer building reactive UI with Charm/Vide instead of manual
            instance mutation, and treating the client as something you validate
            against, not something you trust. I focus heavily on writing
            memory-safe, scalable modules rather than one-off instance scripts.
          </p>
        </div>
      </div>

      {/* Certificate */}
      <div className="ase-card">
        <div className="ase-card-title">
          <span>🎓</span>
          certificate.png
        </div>
        <div className="ase-card-body">
          <p style={{ marginBottom: 12 }}>
            <strong>Continuous Learning:</strong> I recently completed the{" "}
            <strong>Software Engineering Nano Course</strong> at FIAP (3600
            hours), diving into modern software architecture, methodologies, and
            engineering best practices.
          </p>
          <img
            src="/fiap-cert.jpg"
            alt="FIAP Software Engineering Certificate"
            style={{
              width: "100%",
              height: "auto",
              border: "2px solid var(--color-ase-border-dark)",
            }}
          />
        </div>
      </div>

      {/* Currently Exploring */}
      <div className="ase-card">
        <div className="ase-card-title">
          <span>🔮</span>
          exploring.lua
        </div>
        <div className="ase-card-body">
          <p style={{ marginBottom: 12 }}>
            <strong>AI & LLM-Driven NPCs:</strong> Moving beyond rigid behavior
            trees. Testing local/remote LLM calls for dynamic NPC dialogue and
            goal-oriented action planning in Roblox.
          </p>
          <p>
            <strong>Advanced Tooling plugins:</strong> Building internal Roblox
            Studio plugins to automate map generation, rig setups, and UI
            scaling to speed up the team's workflow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
