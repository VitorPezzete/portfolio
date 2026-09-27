const Contact = () => {
  return (
    <div className="ase-section" id="contact">
      <div className="ase-separator">// CONTACT</div>

      <div className="ase-card">
        <div className="ase-card-title">
          <span>💬</span>
          contact.lua
        </div>
        <div className="ase-card-body" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 18,
              marginBottom: 12,
            }}
          >
            Let's Talk
          </h2>
          <p style={{ marginBottom: 16, maxWidth: 400, margin: "0 auto 16px" }}>
            Feel free to reach out — happy to talk about new projects,
            opportunities, or just chat about Software Engineering, Web Dev, and Tech Art.
          </p>
          <p style={{ marginBottom: 20 }}>
            Add me on Discord:{" "}
            <strong style={{ color: "var(--color-ase-selected)" }}>
              @szortk
            </strong>
          </p>

          <a
            href="https://discord.gg/h8TYQEay"
            target="_blank"
            rel="noreferrer"
            className="ase-btn ase-btn-primary"
            style={{
              textDecoration: "none",
              fontSize: 16,
              padding: "8px 24px",
            }}
          >
            ✉ Join my Discord
          </a>
        </div>
      </div>

      {/* Footer-like info */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "var(--font-pixel-body)",
          fontSize: 11,
          color: "var(--color-ase-disabled)",
          marginTop: 24,
          paddingTop: 12,
          borderTop: "1px solid var(--color-ase-border)",
        }}
      >
        Made with ♥ by Szortks — {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Contact;
