import { Gamepad2, Github, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/10 glass-panel mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-600/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 relative group w-fit">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-wide text-white">
                PAG<span className="text-cyan-400">LUS</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Where fun never ends. The ultimate gaming community and hub for hostelers to bond, play, and relieve stress.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-fuchsia-400 hover:bg-white/10 transition-all hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:bg-white/10 transition-all hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">Our Story</Link></li>
              <li><Link to="/menu" className="hover:text-cyan-400 transition-colors">Game Menu</Link></li>
              <li><Link to="/gallery" className="hover:text-cyan-400 transition-colors">Hostel Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Book Now</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Games</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Online Hub</a></li>
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Offline Classics</a></li>
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Multiplayer Arena</a></li>
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Special Offers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>SDM Hostel, Block A</li>
              <li>Game Room 404</li>
              <li>info@paglus.gaming</li>
              <li className="text-cyan-400 pt-2 font-medium">WhatsApp: +91 9483284457</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} SDM Hostel Paglus. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
