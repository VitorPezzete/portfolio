import { motion } from "framer-motion";
import GradientText from "./GradientText";

const About = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-m-20"
    >
      <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/20 transition-all duration-700"></div>
        
        <div className="mb-6 flex justify-start">
          <GradientText
            colors={['#c084fc', '#9333ea', '#4c1d95']}
            animationSpeed={6}
            className="text-3xl font-bold"
          >
            About Me
          </GradientText>
        </div>
        
        <p className="text-lg text-muted leading-relaxed max-w-4xl relative z-10">
          Eleven years in Roblox development, split across both ends of the stack — server-authoritative systems that decide whether a game holds up once real players (and real exploiters) get their hands on it, and the client-side UI/UX layer that decides whether any of that is pleasant to actually play. 
          <br /><br />
          I've worked inside existing codebases and I've run solo projects end to end, owning everything from an empty Rojo project to a live game with its own UI, combat, and persistence.
        </p>

        <div className="mt-10 pt-8 border-t border-white/10 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-2">Continuous Learning</h4>
            <p className="text-muted">
              I believe in constantly expanding my knowledge base beyond Roblox. I recently completed the <strong>Software Engineering Nano Course</strong> at FIAP (3600 hours), diving into modern software architecture, methodologies, and engineering best practices.
            </p>
          </div>
          <div className="w-full md:w-5/12 flex-shrink-0 group/cert relative cursor-pointer">
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover/cert:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            <img 
              src="/fiap-cert.jpg" 
              alt="FIAP Software Engineering Certificate" 
              className="relative z-10 w-full h-auto rounded-xl shadow-2xl border border-white/10 group-hover/cert:border-primary/50 transition-all duration-300 transform group-hover/cert:scale-[1.02]" 
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
