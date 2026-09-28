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
          glc_extreme_network_optimization.md
          <span style={{ marginLeft: "auto", fontSize: 9, opacity: 0.8 }}>
            Sep 2026
          </span>
        </div>
        <div className="ase-card-body">
          <h3 style={{ fontFamily: "var(--font-pixel)", fontSize: 14, marginBottom: 8 }}>
            Network & Security: ByteBuffers + Rolling Keys
          </h3>
          <p style={{ marginBottom: 16 }}>
            In <strong>Grand Line Chronicles</strong>, standard <code>RemoteEvents</code> passing heavy JSON/dictionaries were causing severe bottlenecks for fast-paced combat. To solve this, I engineered a <strong>Network Service</strong> paired with a custom <strong>ByteBuffer</strong> to compress payloads down to raw bytes (UInt8, Int16).
          </p>
          <p style={{ marginBottom: 16 }}>
            But compression wasn't enough; I needed ironclad security against Replay Attacks and Packet Spoofing. I built the <strong>RollingKeyStone</strong> module, utilizing a highly performant modified Linear Congruential Generator (LCG) algorithm. Every single packet is validated against a rolling seed. If an exploiter intercepts and resends a packet, the keys instantly desync and the server drops the request.
          </p>

          <pre style={{ 
            background: "var(--color-ase-workspace)", 
            padding: 12, 
            border: "1px solid var(--color-ase-border-dark)", 
            fontSize: 10, 
            overflowX: "auto",
            marginBottom: 16,
            color: "var(--color-ase-text)"
          }}>
            <code>{`-- [RollingKeyStone.luau]
function RollingKeyStone:CalculateNextKey(sequenceId: number, currentSeed: number): number
    -- Modified Linear Congruential Generator (LCG)
    local a = 1103515245
    local c = 12345
    local m = 2147483648 -- max u32 range
    
    -- Prevents floating point errors, guarantees exact UInt32
    local newSeed = (a * currentSeed + sequenceId + c) % m
    return math.floor(newSeed)
end`}</code>
          </pre>

          <div style={{ display: "flex", gap: 4 }}>
            <span className="ase-tag">#Networking</span>
            <span className="ase-tag">#Security</span>
            <span className="ase-tag">#Cryptography</span>
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

      {/* Article 4 */}
      <div className="ase-card ase-card-clickable">
        <div className="ase-card-title">
          <span>🐘</span>
          laravel_scalable_api_architecture.md
          <span style={{ marginLeft: "auto", fontSize: 9, opacity: 0.8 }}>
            Sep 2026
          </span>
        </div>
        <div className="ase-card-body">
          <h3 style={{ fontFamily: "var(--font-pixel)", fontSize: 14, marginBottom: 8 }}>
            Building Scalable APIs with Laravel
          </h3>
          <p style={{ marginBottom: 16 }}>
            Transitioning from Roblox server-side logic to corporate Web Development feels natural when you understand architectural patterns. In this project, I used <strong>PHP 8</strong> and <strong>Laravel</strong> to build a robust RESTful API.
          </p>
          <p style={{ marginBottom: 16 }}>
            Leveraging Laravel's MVC pattern, Eloquent ORM for database interactions, and Composer for dependency management, I created highly secure endpoints. The frontend seamlessly consumes this API using a <strong>React/TypeScript</strong> client styled with <strong>Tailwind CSS</strong>, resulting in a lightning-fast, reactive user experience.
          </p>
          <div style={{ display: "flex", gap: 4 }}>
            <span className="ase-tag">#WebDev</span>
            <span className="ase-tag">#Laravel</span>
            <span className="ase-tag">#FullStack</span>
          </div>
        </div>
      </div>

      {/* Article 5 */}
      <div className="ase-card ase-card-clickable">
        <div className="ase-card-title">
          <span>🧊</span>
          blender_aseprite_tech_art.md
          <span style={{ marginLeft: "auto", fontSize: 9, opacity: 0.8 }}>
            Oct 2026
          </span>
        </div>
        <div className="ase-card-body">
          <h3 style={{ fontFamily: "var(--font-pixel)", fontSize: 14, marginBottom: 8 }}>
            From Aseprite to Blender: The Tech Art Pipeline
          </h3>
          <p style={{ marginBottom: 16 }}>
            A solid game engineer also understands the asset pipeline. I developed a workflow combining <strong>Aseprite</strong> and <strong>Blender</strong> to create ultra-optimized 3D assets for large-scale grid environments.
          </p>
          <p style={{ marginBottom: 16 }}>
            By modeling low-poly geometry in Blender with precise UV unwrapping, I can apply both retro pixel-perfect textures or smooth, flat-shaded maps painted in Aseprite. This ensures assets look incredibly stylized while maintaining minimal VRAM footprint and peak engine performance.
          </p>
          <div style={{ display: "flex", gap: 4 }}>
            <span className="ase-tag">#TechArt</span>
            <span className="ase-tag">#Blender</span>
            <span className="ase-tag">#Aseprite</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabDevlog;
