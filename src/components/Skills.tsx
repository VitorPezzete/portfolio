import { motion } from "framer-motion";
import GradientText from "./GradientText";
import { Code, Layers, FileCode2, Package, GitMerge } from "lucide-react";

const skills = [
  { name: "Luau (--!strict)", icon: <Code className="w-5 h-5" /> },
  { name: "roblox-ts / TypeScript", icon: <FileCode2 className="w-5 h-5" /> },
  { name: "Vide & Charm", icon: <Layers className="w-5 h-5" /> },
  { name: "Service/Controller DI", icon: <Package className="w-5 h-5" /> },
  { name: "Rojo + Wally", icon: <GitMerge className="w-5 h-5" /> },
  { name: "StyLua / Selene", icon: <Code className="w-5 h-5" /> },
];

const Skills = () => {
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
          animationSpeed={7}
          className="text-3xl font-bold"
        >
          Stack & Tooling
        </GradientText>
      </motion.div>

      <div className="flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center gap-3 px-6 py-4 glass rounded-2xl border-white/5 hover:border-primary/50 transition-colors group cursor-default"
          >
            <div className="text-primary group-hover:scale-110 transition-transform">
              {skill.icon}
            </div>
            <span className="text-white font-medium">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
