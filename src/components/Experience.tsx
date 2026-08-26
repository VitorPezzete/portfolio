import { motion } from "framer-motion";
import GradientText from "./GradientText";

const Experience = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-m-20"
    >
      <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 group-hover:bg-primary/10 transition-all duration-700"></div>
        
        <div className="mb-6 flex justify-start">
          <GradientText
            colors={['#c084fc', '#9333ea', '#4c1d95']}
            animationSpeed={5}
            className="text-3xl font-bold"
          >
            Experience & Architecture
          </GradientText>
        </div>
        
        <p className="text-lg text-muted leading-relaxed max-w-4xl relative z-10">
          Most of my recent work sits at the intersection of strict typing and game architecture — strict Luau, architected the way a roblox-ts codebase would be (Service/Controller, dependency injection).
          <br /><br />
          I prefer building reactive UI with Charm/Vide instead of manual instance mutation, and treating the client as something you validate against, not something you trust. I focus heavily on writing memory-safe, scalable modules rather than one-off instance scripts.
        </p>
      </div>
    </motion.section>
  );
};

export default Experience;
