import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

const Github = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);
import GradientText from "./GradientText";
import Modal from "./Modal";

const projects = [
  {
    title: "Grand Line Chronicles",
    description: "Built the entire codebase solo: combat, magic, inventory, quests, and AI. Engineered an authoritative server environment that completely mitigated combat exploits while keeping client hit-registration buttery smooth.",
    tags: ["Luau", "Vide", "Rojo", "Wally"],
    link: "#",
    githubLink: "https://github.com/VitorPezzete/Grand-Line-Chronicles",
    details: (
      <>
        <p className="mb-4">Grand Line Chronicles was a massive undertaking where I functioned as the sole programmer. The goal was to build an action RPG with zero compromises on security and performance.</p>
        <h4 className="text-white font-bold mb-2">Technical Highlights:</h4>
        <ul className="list-disc pl-5 space-y-2 text-white/80">
          <li><strong>Authoritative Combat:</strong> The server verifies all hits, distances, and cooldowns. Client predictions ensure local feedback is instantaneous.</li>
          <li><strong>Magic & Abilities System:</strong> A modular ability framework where adding a new spell requires zero boilerplate code. Data-driven design using strict Luau types.</li>
          <li><strong>Inventory & Persistence:</strong> A rock-solid inventory system hooked into a session-locked datastore to prevent item cloning during server crashes.</li>
        </ul>
      </>
    )
  },
  {
    title: "Runeborn",
    description: "Implemented all core UI systems using Charm for state management. Wrote the underlying UI framework that decoupled visual components from game logic, allowing for rapid iteration on menus and HUD.",
    tags: ["UI/UX", "Charm", "React-style"],
    link: "#",
    details: (
      <>
        <p className="mb-4">For Runeborn, the focus was creating a highly polished, responsive, and maintainable user interface. Traditional Roblox UI manipulation (mutating instances manually) scales poorly, so I used modern web-dev patterns.</p>
        <h4 className="text-white font-bold mb-2">Technical Highlights:</h4>
        <ul className="list-disc pl-5 space-y-2 text-white/80">
          <li><strong>State-Driven UI:</strong> Used Charm (atomic state management) to ensure the UI is a strict function of state. No desyncs between HUD and actual health.</li>
          <li><strong>Componentization:</strong> Built reusable widgets (buttons, modals, sliders) that the rest of the team could easily plug and play without touching UI code.</li>
          <li><strong>Performance:</strong> Aggressive batching of UI updates to ensure 60fps on low-end mobile devices even during intense combat screens.</li>
        </ul>
      </>
    )
  },
  {
    title: "Adventure Story Retold",
    description: "Led the reverse-engineering and modernization of legacy combat systems. Refactored thousands of lines of spaghetti code into a clean, testable Service/Controller architecture.",
    tags: ["Refactoring", "Architecture", "Optimization"],
    link: "https://www.roblox.com/games/16317617717/Adventure-Story-Retold-April-Fools",
    githubLink: "https://github.com/VitorPezzete/Adventure-Story-Retold",
    details: (
      <>
        <p className="mb-4">Taking over a legacy codebase is often harder than starting from scratch. Adventure Story Retold required surgical precision to fix deep-rooted bugs without breaking the core game feel.</p>
        <h4 className="text-white font-bold mb-2">Technical Highlights:</h4>
        <ul className="list-disc pl-5 space-y-2 text-white/80">
          <li><strong>Architecture Overhaul:</strong> Migrated loose scripts into a rigorous Service (Server) and Controller (Client) pattern with Dependency Injection.</li>
          <li><strong>Performance Optimization:</strong> Identified and eliminated severe memory leaks caused by lingering connections in the old combat scripts.</li>
          <li><strong>Modernization:</strong> Introduced Rojo, Wally, and strict typing (`--!strict`) to a previously unmanaged codebase, drastically reducing runtime errors.</li>
        </ul>
      </>
    )
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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
          Featured Projects
        </GradientText>
      </motion.div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedProject(project)}
            className="group relative glass p-6 md:p-8 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-colors cursor-pointer border-transparent hover:border-primary/30"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="flex items-center gap-4">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {project.link !== "#" && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Play
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-muted leading-relaxed mb-6 max-w-3xl">
                {project.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-3">
                <Code className="w-4 h-4 text-primary" />
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                <span className="ml-auto text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  READ MORE &rarr;
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject?.details}
        <div className="mt-8 flex flex-wrap gap-4">
          {selectedProject?.githubLink && (
            <a 
              href={selectedProject.githubLink} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-all font-medium border border-white/10"
            >
              <Github className="w-5 h-5" />
              View Source
            </a>
          )}
          {selectedProject?.link && selectedProject.link !== "#" && (
            <a 
              href={selectedProject.link} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-white transition-all font-medium"
            >
              <ExternalLink className="w-5 h-5" />
              Play on Roblox
            </a>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default Projects;
