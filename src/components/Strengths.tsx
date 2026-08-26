import { useState } from "react";
import { motion } from "framer-motion";
import { Swords, LayoutTemplate, Network, Cpu, BrainCircuit, Database } from "lucide-react";
import GradientText from "./GradientText";
import Modal from "./Modal";

const strengths = [
  {
    title: "Server-authoritative combat",
    icon: <Swords className="w-6 h-6 text-primary" />,
    shortDesc: "Finite state machines for character and enemy states, guard/parry timing windows...",
    details: (
      <>
        <p>I design combat systems where the server is the absolute source of truth. Every swing, block, and dodge is validated against server-side timing windows and hitboxes.</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-white/80">
          <li><strong>Finite State Machines (FSM):</strong> Cleanly isolate character states (Idle, Attacking, Stunned, Blocking) to prevent overlapping bugs (like attacking while stunned).</li>
          <li><strong>Guard/Parry Windows:</strong> Frame-perfect timing verification with latency compensation.</li>
          <li><strong>I-frames & Punish Windows:</strong> Safely managing invincibility and vulnerability states across the network without exploitable desyncs.</li>
        </ul>
      </>
    )
  },
  {
    title: "Client-side & UI architecture",
    icon: <LayoutTemplate className="w-6 h-6 text-primary" />,
    shortDesc: "Reactive, component-based UI built with Vide and driven by Charm state...",
    details: (
      <>
        <p>I build Roblox UI exactly like modern web apps (React-style). Manual instance mutation is error-prone, so I rely on strict state-driven architectures.</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-white/80">
          <li><strong>Vide & Charm:</strong> Pure reactive UI components that automatically update when game state changes.</li>
          <li><strong>Cross-platform Input:</strong> Seamless handling of PC, Mobile, and Console inputs within the same unified codebase.</li>
          <li><strong>HUD & Inventory:</strong> Deeply wired UI that handles rapid updates (like health bars or damage numbers) with zero lag.</li>
        </ul>
      </>
    )
  },
  {
    title: "Networking & replication",
    icon: <Network className="w-6 h-6 text-primary" />,
    shortDesc: "Custom binary ByteBuffers for compact payloads, VFX/animation sync...",
    details: (
      <>
        <p>RemoteEvents can be slow and easily exploited if not handled properly. I build strictly typed, schema-validated network layers.</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-white/80">
          <li><strong>Binary ByteBuffers:</strong> Compressing large payloads into bytes to save massive amounts of bandwidth.</li>
          <li><strong>VFX Sync:</strong> Offloading visual effects to clients. The server only says "Spawn effect X here", and the clients do the heavy lifting.</li>
          <li><strong>Schema Validation:</strong> Exploiters cannot send malformed data because everything is strictly validated before the server even processes it.</li>
        </ul>
      </>
    )
  },
  {
    title: "NPC & AI systems",
    icon: <BrainCircuit className="w-6 h-6 text-primary" />,
    shortDesc: "Performance-first movement AI, with decision-making and movement kept separate...",
    details: (
      <>
        <p>AI in Roblox can quickly degrade server performance if you have 100+ enemies active. I split the logic into highly optimized loops.</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-white/80">
          <li><strong>Throttled Update Loops:</strong> Decision making (who to attack) runs slowly (e.g. 2 times a second), while movement interpolation runs fast.</li>
          <li><strong>Network Ownership:</strong> Safely assigning ownership to players when applicable, and handling ownership bugs so NPCs don't stutter.</li>
          <li><strong>LLM-driven NPCs:</strong> Experimenting with generative AI (like GPT/Claude) for dynamic dialogue and behavior outside of traditional behavior trees.</li>
        </ul>
      </>
    )
  },
  {
    title: "Memory management",
    icon: <Cpu className="w-6 h-6 text-primary" />,
    shortDesc: "Trove/Janitor-based cleanup discipline, weak tables for caches...",
    details: (
      <>
        <p>A game that runs well for 10 minutes but lags after 2 hours has memory leaks. I write code that cleans up after itself.</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-white/80">
          <li><strong>Trove/Janitor:</strong> Strict lifecycle management. When a player dies or an object is destroyed, every single event connection is disconnected automatically.</li>
          <li><strong>Weak Tables:</strong> Using Lua's weak tables (`__mode`) for caching so the Garbage Collector can do its job.</li>
          <li><strong>Connection Lifecycles:</strong> Profiling and hunting down runaway threads or lingering instances.</li>
        </ul>
      </>
    )
  },
  {
    title: "Data persistence",
    icon: <Database className="w-6 h-6 text-primary" />,
    shortDesc: "Session-locked datastore architecture so two servers can't fight over the same profile...",
    details: (
      <>
        <p>Player data is sacred. Losing an inventory or wiping a save is unacceptable. I use robust, battle-tested datastore patterns.</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-white/80">
          <li><strong>Session Locking:</strong> Preventing item duplication bugs by ensuring only one server can write to a profile at a time.</li>
          <li><strong>Retry & Backoff:</strong> If Roblox datastores go down temporarily, the system caches and retries gracefully without crashing.</li>
          <li><strong>Versioned Schemas:</strong> Safely migrating old player saves to new formats when the game updates.</li>
        </ul>
      </>
    )
  }
];

const Strengths = () => {
  const [selectedStrength, setSelectedStrength] = useState<typeof strengths[0] | null>(null);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-8 flex justify-start"
      >
        <GradientText
          colors={['#c084fc', '#9333ea', '#4c1d95']}
          animationSpeed={8}
          className="text-3xl font-bold"
        >
          Core Engineering Strengths
        </GradientText>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strengths.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedStrength(item)}
            className="glass p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer border-transparent hover:border-primary/50 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all relative z-10">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white relative z-10 group-hover:text-primary transition-colors">{item.title}</h3>
            <p className="text-muted text-sm leading-relaxed relative z-10">{item.shortDesc}</p>
            <div className="mt-4 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
              CLICK TO EXPAND &rarr;
            </div>
          </motion.div>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedStrength} 
        onClose={() => setSelectedStrength(null)}
        title={
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
              {selectedStrength?.icon}
            </div>
            {selectedStrength?.title}
          </div>
        }
      >
        {selectedStrength?.details}
      </Modal>
    </section>
  );
};

export default Strengths;
