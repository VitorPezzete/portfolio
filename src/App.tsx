import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Strengths from "./components/Strengths";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Exploring from "./components/Exploring";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen bg-background text-text overflow-hidden selection:bg-primary/30">
      
      {/* Gradient Background */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#170a30] via-[#000000] to-[#000000]"></div>

      {/* Floating Glowing Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#9333ea] rounded-full filter blur-[150px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#4c1d95] rounded-full filter blur-[180px] animate-pulse" style={{ animationDuration: '14s' }} />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-[#a855f7]/30 rounded-full filter blur-[120px]" />
      </div>

      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Hero />
        </div>
        <main className="container mx-auto px-6 py-12 max-w-5xl space-y-32 pointer-events-auto">
          <About />
          <Experience />
          <Strengths />
          <Skills />
          <Projects />
          <Exploring />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
