import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface FloatingXP {
  id: number;
  amount: number;
  x: number;
  y: number;
}

interface GameContextType {
  xp: number;
  level: number;
  addXp: (amount: number, e: React.MouseEvent | MouseEvent) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [xp, setXp] = useState(0);
  const [floatingXps, setFloatingXps] = useState<FloatingXP[]>([]);

  const addXp = useCallback((amount: number, e: React.MouseEvent | MouseEvent) => {
    setXp((prev) => prev + amount);
    
    // Add floating text
    const newXp = { id: Date.now() + Math.random(), amount, x: e.clientX, y: e.clientY };
    setFloatingXps((prev) => [...prev, newXp]);

    // Remove it after 1 second
    setTimeout(() => {
      setFloatingXps((prev) => prev.filter((item) => item.id !== newXp.id));
    }, 1000);
  }, []);

  const level = Math.floor(xp / 100) + 1;

  return (
    <GameContext.Provider value={{ xp, level, addXp }}>
      {children}
      
      {/* Render Floating XP Global Layer */}
      {floatingXps.map((fxp) => (
        <div
          key={fxp.id}
          className="xp-float"
          style={{
            left: fxp.x,
            top: fxp.y,
          }}
        >
          +{fxp.amount} XP
        </div>
      ))}
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
