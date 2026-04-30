import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Gamepad2, Ghost, MonitorPlay, Star, Trophy, Users, WifiOff } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden pt-12">
        <div className="absolute inset-0 z-[-1]">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
            alt="Gaming Setup" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/80 to-zinc-950" />
        </div>

        <motion.div 
          className="container mx-auto max-w-5xl text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400 text-sm font-medium mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
            </span>
            SDM Hostel's Premier Gaming Hub
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight">
            Welcome to SDM<br />
            Hostel <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 neon-text-purple">Paglus</span> <span className="inline-block animate-bounce">🎮</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
            Where fun never ends. Play exciting online & offline games with your hostel gang. 
            Escape the routine, level up the bonding.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" className="w-full sm:w-auto text-lg group h-14" onClick={() => window.location.href = '/play/snake'}>
              Play Now 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400">
              <WifiOff className="mr-2 w-5 h-5" />
              Fix Network Issue
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Categories & Stats */}
      <section className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-fuchsia-900/40 to-transparent border-fuchsia-500/20 group hover:border-fuchsia-500/50">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-fuchsia-500/20 text-fuchsia-400 group-hover:scale-110 transition-transform">
                  <MonitorPlay className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white">Online Arena</h3>
                <p className="text-sm text-zinc-400">High-speed competitive matches. Valorant, CS:GO, and more.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-cyan-900/40 to-transparent border-cyan-500/20 group hover:border-cyan-500/50">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Ghost className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white">Offline Classics</h3>
                <p className="text-sm text-zinc-400">Campaigns, story modes, and LAN parties down the hall.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-amber-900/40 to-transparent border-amber-500/20 group hover:border-amber-500/50">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white">Console Lounge</h3>
                <p className="text-sm text-zinc-400">FIFA tournaments, Tekken battles, and split-screen chaos.</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Games */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Trending <span className="text-fuchsia-400">Games</span></h2>
            <p className="text-zinc-400">The most popular titles currently being played in the hostel.</p>
          </div>
          <Button variant="ghost" className="hidden sm:flex group">
            View All Games <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Snake Game", category: "Classic Offline", users: "120+", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" },
            { title: "Ludo", category: "Board Game", users: "200+", image: "https://images.unsplash.com/photo-1611891487122-207579d67d98?q=80&w=800&auto=format&fit=crop" }
          ].map((game, i) => (
            <motion.div 
              key={game.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden group border-white/5 bg-zinc-900/30">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-fuchsia-600/80 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded text-white uppercase tracking-wider">
                    {game.category}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display font-bold text-xl mb-2 group-hover:text-cyan-400 transition-colors">{game.title}</h3>
                  <div className="flex items-center justify-between text-sm text-zinc-400 mb-4">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {game.users} playing</span>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => window.location.href = `/play/${game.title.toLowerCase().replace(/ /g, '-')}`}>Play Now</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-zinc-900/30 border-y border-white/5 py-24 relative overflow-hidden">
        {/* Abstract background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Why Choose <span className="text-cyan-400 neon-text-blue">Paglus?</span></h2>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Hostel life can be stressful with assignments and exams. Paglus was created to be your ultimate escape. We bring the community together through gaming.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: "Ultimate Stress Relief", desc: "Take a break from studies and immerse yourself in epic virtual worlds.", icon: <Ghost className="w-6 h-6 text-fuchsia-400" /> },
                  { title: "Hostel Bonding", desc: "Build lasting friendships and rivalries with your block mates.", icon: <Users className="w-6 h-6 text-cyan-400" /> },
                  { title: "Premium Setup", desc: "High-speed networks and low latency optimized for competitive gaming.", icon: <Trophy className="w-6 h-6 text-amber-400" /> }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full glass flex items-center justify-center border-white/10">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-lg text-white">{item.title}</h4>
                      <p className="text-zinc-400 text-sm mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop" 
                  alt="Students playing games" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-900/60 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 box-shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 glass-panel rounded-2xl p-6 shadow-2xl shadow-fuchsia-900/20 max-w-[200px] border-l-4 border-l-cyan-400">
                <div className="flex text-amber-400 mb-2">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="font-display font-bold text-xl leading-tight">"Best place in the hostel!"</p>
                <p className="text-xs text-zinc-400 mt-2">— Room 402</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Urgent CTA */}
      <section className="container mx-auto px-4">
        <div className="p-1 glass-panel rounded-3xl pb-1 bg-gradient-to-r from-fuchsia-600/30 via-zinc-900 to-cyan-600/30">
          <div className="bg-zinc-950/80 backdrop-blur-xl rounded-[1.4rem] p-8 md:p-16 text-center border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px]" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white">Lagging out?<br/>Don't let it ruin the fun.</h2>
              <p className="text-zinc-300 text-lg">
                Experiencing network issues, high ping, or connectivity problems in your room? Reach out immediately to get it fixed.
              </p>
              <div className="pt-4 flex justify-center">
                 <Button variant="primary" size="lg" className="px-8 bg-fuchsia-600 hover:bg-fuchsia-500">
                    Contact Tech Support Now
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
