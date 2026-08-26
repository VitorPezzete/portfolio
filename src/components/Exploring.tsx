import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageSquareCode } from "lucide-react";
import GradientText from "./GradientText";
import Modal from "./Modal";

const explorations = [
  {
    title: "AI & LLM-Driven NPCs",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    shortDesc: "Moving beyond rigid behavior trees. Testing local/remote LLM calls for dynamic NPC dialogue and goal-oriented action planning in Roblox.",
    details: (
      <>
        <p>Traditional Roblox NPCs rely on static dialogue trees and predictable AI paths. I am currently researching how to integrate Large Language Models directly into game logic.</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-white/80">
          <li><strong>Dynamic Dialogue:</strong> Players can chat with NPCs naturally. The LLM interprets the player's intent and responds in-character.</li>
          <li><strong>Action Planning:</strong> Parsing LLM JSON outputs into strict Luau types to trigger actual game events (e.g., an NPC deciding to attack, flee, or give an item).</li>
          <li><strong>HttpService Optimization:</strong> Managing rate limits and latency when connecting Roblox servers to external AI APIs.</li>
        </ul>
      </>
    )
  },
  {
    title: "Advanced Tooling plugins",
    icon: <MessageSquareCode className="w-6 h-6 text-primary" />,
    shortDesc: "Building internal Roblox Studio plugins to automate map generation, rig setups, and UI scaling to speed up the team's workflow.",
    details: (
      <>
        <p>A good developer writes code. A great developer builds tools that write the code for them. I am constantly building plugins to automate the boring parts of Roblox development.</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-white/80">
          <li><strong>UI Automation:</strong> Scripts that automatically scale, anchor, and convert Offset to Scale for perfect UI across all devices.</li>
          <li><strong>Map & Rig Tools:</strong> Custom tooling to automatically rig complex meshes or paint environments, saving artists hours of manual labor.</li>
          <li><strong>Code Generation:</strong> Boilerplate generators for new Rojo components and services.</li>
        </ul>
      </>
    )
  }
];

const Exploring = () => {
  const [selectedItem, setSelectedItem] = useState<typeof explorations[0] | null>(null);

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
          Currently Exploring
        </GradientText>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {explorations.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => setSelectedItem(item)}
            className="glass p-8 rounded-3xl group hover:-translate-y-1 transition-transform duration-300 cursor-pointer border-transparent hover:border-primary/50 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
            </div>
            <p className="text-muted leading-relaxed relative z-10">
              {item.shortDesc}
            </p>
            <div className="mt-4 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
              READ MORE &rarr;
            </div>
          </motion.div>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)}
        title={
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
              {selectedItem?.icon}
            </div>
            {selectedItem?.title}
          </div>
        }
      >
        {selectedItem?.details}
      </Modal>
    </section>
  );
};

export default Exploring;
