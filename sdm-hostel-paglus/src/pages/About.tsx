import { motion } from "framer-motion";
import { CheckCircle2, HeartHandshake, ShieldCheck, Target } from "lucide-react";

export default function About() {
  return (
    <div className="pb-20">
      {/* Header */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <h1 className="text-[15vw] font-display font-black tracking-tighter whitespace-nowrap">ABOUT US</h1>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              The Story of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Paglus</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
              Born from a simple idea in a cramped hostel room: gaming should bring people together, not isolate them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            className="glass-panel p-10 rounded-3xl border-t-4 border-t-fuchsia-500 relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-bl-full" />
            <Target className="w-12 h-12 text-fuchsia-400 mb-6" />
            <h2 className="text-3xl font-display font-bold mb-4">Our Mission</h2>
            <p className="text-zinc-300 leading-relaxed text-lg">
              To provide a fun, bonding, and strictly stress-free gaming environment for every student at SDM Hostel. We believe in taking breaks, connecting with roommates, and leveling up in life and games.
            </p>
          </motion.div>

          <motion.div 
            className="glass-panel p-10 rounded-3xl border-t-4 border-t-cyan-500 relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full" />
            <ShieldCheck className="w-12 h-12 text-cyan-400 mb-6" />
            <h2 className="text-3xl font-display font-bold mb-4">Our Vision</h2>
            <p className="text-zinc-300 leading-relaxed text-lg">
              To build the absolute best hostel gaming community, recognized for fair play, high-octane tournaments, and an unbreakable brotherhood of students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content block: Images + Text */}
      <section className="container mx-auto px-4 mb-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <motion.h2 
              className="text-4xl font-display font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              More Than Just Screen Time
            </motion.h2>
            <motion.p 
              className="text-zinc-400 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Hostel life is tough. Between the cafeteria food and endless assignments, you need an outlet. Paglus isn't just a gaming service—it's a community built by hostelers, for hostelers.
            </motion.p>
            <motion.p 
              className="text-zinc-400 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              We offer everything from casual mobile tournaments to intense, high-stakes offline console battles. 
            </motion.p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop" 
                alt="Gaming controller" 
                className="rounded-2xl w-full h-48 md:h-64 object-cover"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1542320868-f4d80389e1c4?q=80&w=800&auto=format&fit=crop" 
                alt="PC Gaming Setup" 
                className="rounded-2xl w-full h-48 md:h-64 object-cover translate-y-8"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rules and Fair Play */}
      <section className="bg-zinc-900/50 border-y border-white/5 py-20 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">House Rules</h2>
            <p className="text-zinc-400">Keep it clean, keep it fun. Our standard rules ensure fair play for everyone.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { rule: "Respect the Queue", desc: "First come, first serve for console slots." },
              { rule: "No Rage Quitting", desc: "Play till the end. Accept defeat like a champ." },
              { rule: "Zero Toxicity", desc: "Friendly banter only. No personal insults." },
              { rule: "Report Network Issues", desc: "Don't suffer in silence, let tech team know." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center space-y-4 border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-cyan-900/40 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">{item.rule}</h4>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
