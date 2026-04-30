import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Users, Monitor, Search, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

const categories = ["All", "Online Games", "Offline Games", "Main Games", "Multiplayer", "Individual", "Special Offers"];

const games: { id: number; title: string; category: string; type: string; desc: string; image: string; popular?: boolean; special?: boolean }[] = [
  { id: 1, title: "Snake Game", category: "Offline Games", type: "Classic", desc: "The classic arcade game. Eat the cubes and grow!", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800", popular: true },
  { id: 3, title: "Ludo", category: "Multiplayer", type: "Board Game", desc: "Roll the dice, race your friends to home!", image: "https://images.unsplash.com/photo-1611891487122-207579d67d98?q=80&w=800", popular: true }
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter(game => {
    const matchesCategory = activeCategory === "All" || game.category === activeCategory || game.type === activeCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-zinc-900/30 border-b border-white/5 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Game <span className="text-fuchsia-400">Roster</span></h1>
        <p className="text-zinc-400 max-w-2xl mx-auto px-4">
          Browse our extensive collection of games available in the hostel. From competitive shooters to relaxing single-player campaigns.
        </p>
      </section>

      <section className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                  ? "bg-cyan-500 text-zinc-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                  : "glass text-zinc-300 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search games..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Game Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`h-full flex flex-col overflow-hidden group ${game.special ? "border-amber-500/50 bg-gradient-to-b from-amber-900/20 to-zinc-900/40" : "bg-zinc-900/40 border-white/5"}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={game.image} 
                      alt={game.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-zinc-950/80 backdrop-blur-md text-xs font-semibold px-2.5 py-1 rounded-md text-zinc-300 border border-white/10">
                        {game.type}
                      </span>
                    </div>

                    {game.popular && (
                      <div className="absolute top-3 right-3 bg-fuchsia-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-[0_0_10px_rgba(192,38,211,0.5)]">
                        Trending
                      </div>
                    )}
                    {game.special && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-zinc-950 text-xs font-bold px-2.5 py-1 rounded-md shadow-[0_0_10px_rgba(251,191,36,0.5)] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Special Offer
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display font-bold text-xl mb-2 group-hover:text-cyan-400 transition-colors">{game.title}</h3>
                    <p className="text-zinc-400 text-sm mb-6 flex-1">{game.desc}</p>
                    
                    <Button onClick={() => window.location.href = `/play/${game.title.toLowerCase().replace(/ /g, '-')}`} variant={game.special ? "primary" : "outline"} className={`w-full ${game.special ? "bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-[0_0_15px_rgba(251,191,36,0.5)]" : ""}`}>
                      Play Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGames.length === 0 && (
          <div className="text-center py-24 glass rounded-3xl">
            <Gamepad2 className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-zinc-300">No games found</h3>
            <p className="text-zinc-500 mt-2">Try adjusting your filters or search query.</p>
          </div>
        )}
      </section>
    </div>
  );
}
