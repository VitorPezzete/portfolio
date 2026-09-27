const TabDevlog = () => {
  return (
    <div className="ase-section">
      <div className="ase-separator">// DEVLOG.TXT</div>
      
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: 24, marginBottom: 16 }}>
          Development Log
        </h1>
        <p style={{ color: "var(--color-ase-disabled)" }}>
          Thoughts on Roblox engineering, performance, and architecture.
        </p>
      </div>

      {/* Article 1 */}
      <div className="ase-card ase-card-clickable">
        <div className="ase-card-title">
          <span>📄</span>
          llm_npcs_in_roblox.md
          <span style={{ marginLeft: "auto", fontSize: 9, opacity: 0.8 }}>
            Oct 2026
          </span>
        </div>
        <div className="ase-card-body">
          <h3 style={{ fontFamily: "var(--font-pixel)", fontSize: 14, marginBottom: 8 }}>
            Moving Beyond Behavior Trees
          </h3>
          <p style={{ marginBottom: 16 }}>
            Recently, I've been experimenting with replacing rigid behavior trees with LLM-driven decision making for NPCs. 
            By feeding the context of the game state into a lightweight model, NPCs can dynamically decide their next action (e.g. "attack", "flee", "talk") based on a much richer set of variables than traditional hardcoded nodes.
          </p>

          {/* LLM NPC Video Clips */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            <div style={{ border: "2px solid var(--color-ase-border-dark)", background: "var(--color-ase-workspace)", padding: 4 }}>
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                controls
                style={{ width: "100%", display: "block", imageRendering: "pixelated" }}
              >
                <source src="/Roblox-2026-09-05T17_56_45.556Z.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div style={{ border: "2px solid var(--color-ase-border-dark)", background: "var(--color-ase-workspace)", padding: 4 }}>
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                controls
                style={{ width: "100%", display: "block", imageRendering: "pixelated" }}
              >
                <source src="/Roblox-2026-09-05T17_59_52.248Z.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div style={{ display: "flex", gap: 4 }}>
            <span className="ase-tag">#AI</span>
            <span className="ase-tag">#Roblox</span>
            <span className="ase-tag">#Architecture</span>
          </div>
        </div>
      </div>

      {/* GLC Article */}
      <div className="ase-card ase-card-clickable">
        <div className="ase-card-title">
          <span>🛡️</span>
          glc_server_authoritative_combat.md
          <span style={{ marginLeft: "auto", fontSize: 9, opacity: 0.8 }}>
            Sep 2026
          </span>
        </div>
        <div className="ase-card-body">
          <h3 style={{ fontFamily: "var(--font-pixel)", fontSize: 14, marginBottom: 8 }}>
            Architecting Grand Line Chronicles
          </h3>
          <p style={{ marginBottom: 16 }}>
            For <strong>Chronicles</strong>, I designed an enterprise-grade, server-authoritative Action RPG framework. 
            The golden rule: <em>Never Trust the Client</em>. All critical logic—Targeting, I-Frames, Status Effects, and Hit Reactions—is processed purely on the server.
            By utilizing spatial querying (Sphere/Boxcasts) paired with custom physics-based anti-cheat algorithms, proxy hits and exploiters are mathematically neutralized before they can impact gameplay.
          </p>
          <p style={{ marginBottom: 16 }}>
            Under the hood, it's powered by strict typing (akin to Roblox-TS) and a rigorous <strong>Service/Controller</strong> pattern. To guarantee zero memory leaks in production, the framework heavily relies on the <strong>Trove</strong> pattern and Weak Tables for automated garbage collection.
          </p>
          <div style={{ display: "flex", gap: 4 }}>
            <span className="ase-tag">#Security</span>
            <span className="ase-tag">#Combat</span>
            <span className="ase-tag">#AntiCheat</span>
          </div>
        </div>
      </div>

      {/* Article 3 */}
      <div className="ase-card ase-card-clickable">
        <div className="ase-card-title">
          <span>📄</span>
          session_locking_101.md
          <span style={{ marginLeft: "auto", fontSize: 9, opacity: 0.8 }}>
            Aug 2026
          </span>
        </div>
        <div className="ase-card-body">
          <h3 style={{ fontFamily: "var(--font-pixel)", fontSize: 14, marginBottom: 8 }}>
            Bulletproof Datastores
          </h3>
          <p style={{ marginBottom: 16 }}>
            Item cloning is the quickest way to ruin a game's economy. In this post, I break down how to implement strict session locking using Roblox's ProfileService/DataStore2 patterns, ensuring that two servers can never write to the same profile simultaneously.
          </p>
          <div style={{ display: "flex", gap: 4 }}>
            <span className="ase-tag">#Data</span>
            <span className="ase-tag">#Security</span>
            <span className="ase-tag">#Backend</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabDevlog;
