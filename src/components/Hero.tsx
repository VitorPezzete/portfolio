import { motion } from "framer-motion";
import { Code, MessagesSquare, Code2, GraduationCap } from "lucide-react";
import DepthText from "./DepthText";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-primary/30">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide">Available 48h/week (GMT-3)</span>
          </div>
        </motion.div>

        <motion.h1 
          className="mb-6 tracking-tight flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <DepthText 
            text="Szortks" 
            faceColor="#f8fafc" 
            depthColor="#4c1d95" 
            fontSize="clamp(4rem, 15vw, 8rem)" 
          />
          <span className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
            Full-Stack Roblox Developer
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          11 years crafting server-authoritative combat, reactive UI, and robust systems on Roblox.
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <a href="https://github.com/VitorPezzete" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 hover:border-primary/50">
            <Code className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/10">
            <MessagesSquare className="w-5 h-5 text-primary" />
            <span>Discord: szortk</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/10">
            <Code2 className="w-5 h-5 text-primary" />
            <span>Roblox: Szortks</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/10">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span>B.Sc. Software Engineering</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
