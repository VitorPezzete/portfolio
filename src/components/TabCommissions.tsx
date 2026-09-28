const TabCommissions = () => {
  return (
    <div className="ase-section">
      <div className="ase-separator">// COMMISSIONS.INI</div>
      
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: 24, marginBottom: 16 }}>
          Services & Pricing
        </h1>
        <p style={{ color: "var(--color-ase-disabled)" }}>
          Available for contract work and consulting.
        </p>
      </div>

      <div className="ase-card">
        <div className="ase-card-title">
          <span>🛠️</span>
          services_list.cfg
        </div>
        <div className="ase-card-body">
          <ul style={{ paddingLeft: 16, lineHeight: 1.8 }}>
            <li><strong>Game Engineering:</strong> Combat frameworks, inventory systems, magic/ability wrappers.</li>
            <li><strong>UI/UX Implementation:</strong> Converting Figma designs into pixel-perfect, reactive Roact/Vide components.</li>
            <li><strong>Full-Stack Web:</strong> Landing pages, portfolios, and backend RESTful APIs using Laravel/PHP and TypeScript/React.</li>
            <li><strong>Technical Art:</strong> Low-poly 3D modeling in Blender and customized UI/Textures mapped via Aseprite.</li>
          </ul>
        </div>
      </div>

      <div className="ase-card">
        <div className="ase-card-title">
          <span>💰</span>
          pricing.json
        </div>
        <div className="ase-card-body">
          <p style={{ marginBottom: 16 }}>
            My rates depend heavily on the complexity of the task, the timeline, and whether the work involves modifying an existing messy codebase or building from scratch.
          </p>
          
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-ase-border)", textAlign: "left" }}>
                <th style={{ padding: "8px 0" }}>Service</th>
                <th style={{ padding: "8px 0" }}>Starting Rate</th>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-ase-border)" }}>
                <td style={{ padding: "8px 0" }}>Hourly Consulting / Debugging</td>
                <td style={{ padding: "8px 0" }}>$5 USD / hr</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-ase-border)" }}>
                <td style={{ padding: "8px 0" }}>Small Feature (e.g. single UI menu)</td>
                <td style={{ padding: "8px 0" }}>$15+ USD</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-ase-border)" }}>
                <td style={{ padding: "8px 0" }}>Core System (e.g. full inventory)</td>
                <td style={{ padding: "8px 0" }}>$30+ USD</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-ase-border)" }}>
                <td style={{ padding: "8px 0" }}>Full Game / Custom Contract</td>
                <td style={{ padding: "8px 0" }}>On Demand</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-ase-border)" }}>
                <td style={{ padding: "8px 0" }}>Full-Stack Web App (Laravel/React)</td>
                <td style={{ padding: "8px 0" }}>$150+ USD</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-ase-border)" }}>
                <td style={{ padding: "8px 0" }}>Web Portfolios / Landing Pages</td>
                <td style={{ padding: "8px 0" }}>$50+ USD</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-ase-border)" }}>
                <td style={{ padding: "8px 0" }}>Technical Art (Blender/Aseprite)</td>
                <td style={{ padding: "8px 0" }}>On Demand</td>
              </tr>
            </tbody>
          </table>
          
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <p style={{ fontSize: 11, color: "var(--color-ase-disabled)", marginBottom: 6 }}>
              <strong>Flexible Contracts:</strong> Open to weekly/monthly salaries, % rev-share, upfront payments, and on-demand pricing.
            </p>
            <p style={{ fontSize: 11, color: "var(--color-ase-disabled)", marginBottom: 12 }}>
              Payment accepted via DevEx equivalent (Robux), PayPal, or Crypto.
            </p>
            <a 
              href="https://discord.gg/h8TYQEay" 
              target="_blank" 
              rel="noreferrer"
              className="ase-btn ase-btn-primary" 
              style={{ textDecoration: "none" }}
            >
              ✉ DM to Discuss
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabCommissions;
