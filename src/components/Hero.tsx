const Hero = () => {
  return (
    <div className="ase-section" id="hero">
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "clamp(24px, 5vw, 48px)",
            letterSpacing: 2,
            marginBottom: 8,
            color: "var(--color-ase-text)",
          }}
        >
          Szortks
        </h1>
        <p
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "clamp(8px, 2vw, 14px)",
            color: "var(--color-ase-separator)",
            marginBottom: 16,
          }}
        >
          Software Engineer & Technical Artist
        </p>

        {/* Availability badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--color-ase-tooltip)",
            border: "1px solid var(--color-ase-border-dark)",
            padding: "4px 12px",
            fontFamily: "var(--font-pixel-body)",
            fontSize: 12,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              background: "var(--color-ase-selected)",
              border: "1px solid var(--color-ase-border-dark)",
              display: "inline-block",
            }}
          />
          Available 48h/week (GMT-3)
        </div>
      </div>

      {/* Tagline */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-pixel-body)",
          fontSize: 16,
          color: "var(--color-ase-text)",
          maxWidth: 600,
          margin: "0 auto 24px",
          lineHeight: 1.6,
        }}
      >
        11 years architecting massive multiplayer systems. Bridging the gap between 
        Full-Stack Web (Laravel/React), Technical Art, and Game Engineering.
      </p>

      {/* Links */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <a
          href="https://github.com/VitorPezzete"
          target="_blank"
          rel="noreferrer"
          className="ase-btn"
          style={{ textDecoration: "none" }}
        >
          GitHub
        </a>
        <span className="ase-btn" style={{ cursor: "default" }}>
          Discord: szortk
        </span>
        <span className="ase-btn" style={{ cursor: "default" }}>
          Roblox: Szortks
        </span>
        <span className="ase-btn" style={{ cursor: "default" }}>
          B.Sc. Software Eng.
        </span>
      </div>
    </div>
  );
};

export default Hero;
