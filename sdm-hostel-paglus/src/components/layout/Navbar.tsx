import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3" : "bg-transparent py-5"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 relative group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-fuchsia-600/20 text-fuchsia-500 group-hover:bg-fuchsia-600/30 transition-colors">
              <Gamepad2 className="w-6 h-6" />
              <div className="absolute inset-0 bg-fuchsia-600/20 blur-xl rounded-full" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-white">
              PAG<span className="text-cyan-400">LUS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-cyan-400 ${location.pathname === link.path ? "text-cyan-400 neon-text-blue" : "text-zinc-300"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="w-px h-6 bg-white/10" />
            <Button size="sm" className="font-display" onClick={() => window.location.href = '/play/snake'}>
              Play Now
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-zinc-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 glass flex flex-col pt-24 px-6 pb-6 h-screen"
          >
            <button
              className="absolute top-6 right-6 p-2 text-zinc-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <ul className="flex flex-col gap-6 items-center flex-1 justify-center">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-display font-bold transition-colors ${location.pathname === link.path ? "text-cyan-400 neon-text-blue" : "text-zinc-300 hover:text-white"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button size="lg" className="w-full mt-auto font-display" onClick={() => { setIsMobileMenuOpen(false); window.location.href = '/play/snake'; }}>
              Play Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
