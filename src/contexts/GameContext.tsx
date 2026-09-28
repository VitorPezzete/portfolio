import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

/* ───── Types ───── */
interface FloatingXP {
  id: number;
  amount: number;
  x: number;
  y: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
}

interface AchievementToast {
  id: number;
  achievement: Achievement;
}

interface GameContextType {
  xp: number;
  level: number;
  totalXp: number;
  xpToNext: number;
  xpInLevel: number;
  addXp: (amount: number, e?: React.MouseEvent | MouseEvent | { clientX: number; clientY: number }) => void;
  unlockAchievement: (id: string, e?: React.MouseEvent | MouseEvent | { clientX: number; clientY: number }) => void;
  unlockedAchievements: Set<string>;
  isLevelingUp: boolean;
}

/* ───── Achievement Definitions ───── */
export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_blood",    title: "First Blood",       description: "Opened your first devlog article",    icon: "🩸", xpReward: 25 },
  { id: "pixel_artist",   title: "Pixel Artist",      description: "Used the Paint Bucket tool",          icon: "🎨", xpReward: 15 },
  { id: "navigator",      title: "Navigator",         description: "Visited all 3 tabs",                  icon: "🧭", xpReward: 30 },
  { id: "zen_master",     title: "Zen Master",        description: "Activated Zen Mode",                  icon: "🧘", xpReward: 20 },
  { id: "detective",      title: "Detective",         description: "Opened 3 skill cards",                icon: "🔍", xpReward: 20 },
  { id: "window_shopper", title: "Window Shopper",    description: "Checked commission pricing",          icon: "🛒", xpReward: 15 },
  { id: "link_sharer",    title: "Link Sharer",       description: "Copied the portfolio URL",            icon: "🔗", xpReward: 50 },
  { id: "time_traveler",  title: "Time Traveler",     description: "Changed the theme 3 times",           icon: "⏳", xpReward: 25 },
  { id: "scholar",        title: "Scholar",           description: "Opened all devlog articles",          icon: "📚", xpReward: 40 },
  { id: "archmage",       title: "Archmage",          description: "Reached Level 5",                     icon: "🧙", xpReward: 100 },
];

/* ───── XP Curve ───── */
function xpForLevel(level: number): number {
  // Each level needs progressively more XP: 100, 150, 225, 337...
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

function computeLevel(totalXp: number): { level: number; xpInLevel: number; xpToNext: number } {
  let level = 1;
  let remaining = totalXp;
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level++;
  }
  return { level, xpInLevel: remaining, xpToNext: xpForLevel(level) };
}

/* ───── Context ───── */
const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [totalXp, setTotalXp] = useState(0);
  const [floatingXps, setFloatingXps] = useState<FloatingXP[]>([]);
  const [toasts, setToasts] = useState<AchievementToast[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(1);

  const { level, xpInLevel, xpToNext } = computeLevel(totalXp);

  // Detect level-ups
  useEffect(() => {
    if (level > prevLevel && prevLevel > 0) {
      setIsLevelingUp(true);
      // Screen shake via class on body
      document.body.classList.add("screen-shake");
      setTimeout(() => {
        setIsLevelingUp(false);
        document.body.classList.remove("screen-shake");
      }, 600);

      // Auto-unlock Archmage at level 5
      if (level >= 5) {
        unlockAchievement("archmage");
      }
    }
    setPrevLevel(level);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const addXp = useCallback((amount: number, e?: React.MouseEvent | MouseEvent | { clientX: number; clientY: number }) => {
    setTotalXp((prev) => prev + amount);

    if (e) {
      const id = Date.now() + Math.random();
      const newXp: FloatingXP = { id, amount, x: e.clientX, y: e.clientY };
      setFloatingXps((prev) => [...prev, newXp]);
      setTimeout(() => {
        setFloatingXps((prev) => prev.filter((item) => item.id !== id));
      }, 1200);
    }
  }, []);

  const unlockAchievement = useCallback((achievementId: string, e?: React.MouseEvent | MouseEvent | { clientX: number; clientY: number }) => {
    setUnlockedAchievements((prev) => {
      if (prev.has(achievementId)) return prev;
      const next = new Set(prev);
      next.add(achievementId);

      const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
      if (achievement) {
        // Give XP reward
        setTotalXp((prevXp) => prevXp + achievement.xpReward);

        // Show floating XP if we have a position
        if (e) {
          const id = Date.now() + Math.random();
          setFloatingXps((prevFloats) => [
            ...prevFloats,
            { id, amount: achievement.xpReward, x: e.clientX, y: e.clientY },
          ]);
          setTimeout(() => {
            setFloatingXps((prevFloats) => prevFloats.filter((item) => item.id !== id));
          }, 1200);
        }

        // Show achievement toast
        const toastId = Date.now() + Math.random();
        setToasts((prevToasts) => [...prevToasts, { id: toastId, achievement }]);
        setTimeout(() => {
          setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toastId));
        }, 4000);
      }

      return next;
    });
  }, []);

  return (
    <GameContext.Provider
      value={{
        xp: totalXp,
        level,
        totalXp,
        xpToNext,
        xpInLevel,
        addXp,
        unlockAchievement,
        unlockedAchievements,
        isLevelingUp,
      }}
    >
      {children}

      {/* Floating XP Layer */}
      {floatingXps.map((fxp) => (
        <div
          key={fxp.id}
          className="xp-float"
          style={{
            left: fxp.x,
            top: fxp.y,
            fontSize: fxp.amount >= 50 ? 28 : fxp.amount >= 25 ? 24 : 18,
          }}
        >
          +{fxp.amount} XP
        </div>
      ))}

      {/* Level Up Banner */}
      {isLevelingUp && (
        <div className="level-up-banner">
          <span className="level-up-text">⬆ LEVEL UP! ⬆</span>
          <span className="level-up-sub">You are now Level {level}</span>
        </div>
      )}

      {/* Achievement Toasts */}
      <div className="achievement-toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="achievement-toast">
            <div className="achievement-toast-icon">{toast.achievement.icon}</div>
            <div className="achievement-toast-info">
              <div className="achievement-toast-title">Achievement Unlocked!</div>
              <div className="achievement-toast-name">{toast.achievement.title}</div>
              <div className="achievement-toast-desc">{toast.achievement.description}</div>
            </div>
            <div className="achievement-toast-xp">+{toast.achievement.xpReward} XP</div>
          </div>
        ))}
      </div>
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
