import { useState, useRef } from "react";
import { useGame } from "../contexts/GameContext";

/* ───── Quest Definitions ───── */
interface Quest {
  id: number;
  title: string;
  questGiver: string;
  icon: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Legendary";
  xpReward: number;
  summary: string;
  content: React.ReactNode;
  tags: string[];
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "#1eff00",
  Medium: "#0070dd",
  Hard: "#a335ee",
  Legendary: "#ff8000",
};

const quests: Quest[] = [
  {
    id: 0,
    title: "Moving Beyond Behavior Trees",
    questGiver: "NPC Guild",
    icon: "📄",
    difficulty: "Hard",
    xpReward: 30,
    summary: "Investigate LLM-driven NPC decision making as a replacement for rigid behavior trees.",
    tags: ["#AI", "#Roblox", "#Architecture"],
    content: (
      <>
        <p style={{ marginBottom: 16 }}>
          Recently, I've been experimenting with replacing rigid behavior trees with LLM-driven decision making for NPCs.
          By feeding the context of the game state into a lightweight model, NPCs can dynamically decide their next action
          (e.g. "attack", "flee", "talk") based on a much richer set of variables than traditional hardcoded nodes.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          <div style={{ border: "2px solid var(--color-ase-border-dark)", background: "var(--color-ase-workspace)", padding: 4 }}>
            <video autoPlay loop muted playsInline controls style={{ width: "100%", display: "block", imageRendering: "pixelated" }}>
              <source src="/Roblox-2026-09-05T17_56_45.556Z.mp4" type="video/mp4" />
            </video>
          </div>
          <div style={{ border: "2px solid var(--color-ase-border-dark)", background: "var(--color-ase-workspace)", padding: 4 }}>
            <video autoPlay loop muted playsInline controls style={{ width: "100%", display: "block", imageRendering: "pixelated" }}>
              <source src="/Roblox-2026-09-05T17_59_52.248Z.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 1,
    title: "ByteBuffers + Rolling Keys",
    questGiver: "Network Forge",
    icon: "🛡️",
    difficulty: "Legendary",
    xpReward: 50,
    summary: "Engineer extreme network optimization with binary serialization and anti-replay security.",
    tags: ["#Networking", "#Security", "#Cryptography"],
    content: (
      <>
        <p style={{ marginBottom: 16 }}>
          In <strong>Grand Line Chronicles</strong>, standard <code>RemoteEvents</code> passing heavy JSON/dictionaries
          were causing severe bottlenecks. I engineered a <strong>Network Service</strong> paired with a custom
          <strong> ByteBuffer</strong> to compress payloads down to raw bytes.
        </p>
        <p style={{ marginBottom: 16 }}>
          I also built the <strong>RollingKeyStone</strong> module — a modified Linear Congruential Generator (LCG)
          that validates every packet against a rolling seed. If an exploiter intercepts and resends a packet, the keys
          instantly desync and the server drops it.
        </p>
        <pre style={{ background: "var(--color-ase-workspace)", padding: 12, border: "1px solid var(--color-ase-border-dark)", fontSize: 10, overflowX: "auto", marginBottom: 16, color: "var(--color-ase-text)" }}>
          <code>{`-- [RollingKeyStone.luau]
function RollingKeyStone:CalculateNextKey(sequenceId: number, currentSeed: number): number
    local a = 1103515245
    local c = 12345
    local m = 2147483648 -- max u32 range
    local newSeed = (a * currentSeed + sequenceId + c) % m
    return math.floor(newSeed)
end`}</code>
        </pre>
      </>
    ),
  },
  {
    id: 2,
    title: "Bulletproof Datastores",
    questGiver: "Vault Keeper",
    icon: "📄",
    difficulty: "Medium",
    xpReward: 20,
    summary: "Implement strict session locking to prevent item duplication across servers.",
    tags: ["#Data", "#Security", "#Backend"],
    content: (
      <p style={{ marginBottom: 16 }}>
        Item cloning is the quickest way to ruin a game's economy. I break down how to implement strict session locking
        using Roblox's ProfileService/DataStore2 patterns, ensuring that two servers can never write to the same profile
        simultaneously.
      </p>
    ),
  },
  {
    id: 3,
    title: "Scalable APIs with Laravel",
    questGiver: "Web Architect",
    icon: "🐘",
    difficulty: "Medium",
    xpReward: 20,
    summary: "Build a robust RESTful API using PHP 8, Laravel MVC, and Eloquent ORM.",
    tags: ["#WebDev", "#Laravel", "#FullStack"],
    content: (
      <>
        <p style={{ marginBottom: 16 }}>
          Transitioning from Roblox server-side logic to corporate Web Development feels natural when you understand
          architectural patterns. I used <strong>PHP 8</strong> and <strong>Laravel</strong> to build a robust RESTful API.
        </p>
        <p style={{ marginBottom: 16 }}>
          Leveraging Laravel's MVC pattern, Eloquent ORM, and Composer for dependency management, I created highly secure
          endpoints. The frontend consumes this API using <strong>React/TypeScript</strong> styled with <strong>Tailwind CSS</strong>.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: "Aseprite → Blender Pipeline",
    questGiver: "Art Sage",
    icon: "🧊",
    difficulty: "Easy",
    xpReward: 15,
    summary: "Develop a workflow combining Aseprite textures with low-poly Blender models for game environments.",
    tags: ["#TechArt", "#Blender", "#Aseprite"],
    content: (
      <>
        <p style={{ marginBottom: 16 }}>
          A solid game engineer also understands the asset pipeline. I developed a workflow combining <strong>Aseprite</strong>
          and <strong>Blender</strong> to create ultra-optimized 3D assets for large-scale grid environments.
        </p>
        <p style={{ marginBottom: 16 }}>
          By modeling low-poly geometry in Blender with precise UV unwrapping, I can apply both retro pixel-perfect textures
          or smooth, flat-shaded maps. This ensures minimal VRAM footprint and peak engine performance.
        </p>
      </>
    ),
  },
];

/* ───── Component ───── */
const TabDevlog = () => {
  const [expandedQuest, setExpandedQuest] = useState<number | null>(null);
  const [completedQuests, setCompletedQuests] = useState<Set<number>>(new Set());
  const { addXp, unlockAchievement } = useGame();
  const readArticles = useRef<Set<number>>(new Set());

  const handleQuestClick = (quest: Quest, e: React.MouseEvent) => {
    const isOpening = expandedQuest !== quest.id;
    setExpandedQuest(isOpening ? quest.id : null);
    if (isOpening) {
      addXp(quest.xpReward, e);
      if (!readArticles.current.has(quest.id)) {
        readArticles.current.add(quest.id);
        setCompletedQuests((prev) => new Set(prev).add(quest.id));
        unlockAchievement("first_blood", e);
        if (readArticles.current.size >= quests.length) {
          unlockAchievement("scholar", e);
        }
      }
    }
  };

  const completedCount = completedQuests.size;

  return (
    <div className="ase-section">
      <div className="ase-separator">// QUEST_LOG.DAT</div>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-pixel)", fontSize: 24, marginBottom: 8 }}>
          📜 Quest Log
        </h1>
        <p style={{ color: "var(--color-ase-disabled)", marginBottom: 12 }}>
          Technical writeups and engineering deep-dives. Click to accept a quest.
        </p>
        <div style={{ display: "inline-flex", gap: 8, alignItems: "center", fontFamily: "var(--font-pixel)", fontSize: 11 }}>
          <span style={{ color: "#1eff00" }}>✅ {completedCount}</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>{quests.length} Quests</span>
        </div>
      </div>

      {quests.map((quest) => {
        const isCompleted = completedQuests.has(quest.id);
        const isExpanded = expandedQuest === quest.id;
        const diffColor = DIFFICULTY_COLORS[quest.difficulty];

        return (
          <div
            key={quest.id}
            className={`quest-card ${isCompleted ? "quest-completed" : ""} ${isExpanded ? "quest-expanded" : ""}`}
            onClick={(e) => handleQuestClick(quest, e)}
            style={{
              borderColor: isExpanded ? diffColor : undefined,
            }}
          >
            {/* Quest Header */}
            <div className="quest-header">
              <div className="quest-status">
                {isCompleted ? (
                  <span className="quest-check">✅</span>
                ) : (
                  <span className="quest-exclaim" style={{ color: diffColor }}>❗</span>
                )}
              </div>
              <div className="quest-title-block">
                <div className="quest-title">{quest.title}</div>
                <div className="quest-giver">Quest Giver: {quest.questGiver}</div>
              </div>
              <div className="quest-meta">
                <span className="quest-difficulty" style={{ color: diffColor }}>
                  {quest.difficulty}
                </span>
                <span className="quest-xp">+{quest.xpReward} XP</span>
              </div>
            </div>

            {/* Quest Summary (always visible) */}
            <div className="quest-summary">
              {quest.summary}
            </div>

            {/* Quest Content (expanded) */}
            {isExpanded && (
              <div className="quest-content">
                <div className="quest-content-divider" />
                {quest.content}
                <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                  {quest.tags.map((tag) => (
                    <span key={tag} className="ase-tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TabDevlog;
