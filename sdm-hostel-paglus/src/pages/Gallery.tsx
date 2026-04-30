import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200", alt: "Neon Gaming Setup", category: "Rules & Gameplay", className: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800", alt: "Friends Gaming", category: "Fun Game Moments", className: "md:col-span-1 md:row-span-1" },
  { id: 3, src: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800", alt: "Dark Aesthetic", category: "Gameplay Visuals", className: "md:col-span-1 md:row-span-2" },
  { id: 4, src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800", alt: "Controller", category: "Friends Playing", className: "md:col-span-1 md:row-span-1" },
  { id: 5, src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800", alt: "Arcade Style", category: "Special Events", className: "md:col-span-2 md:row-span-1" },
  { id: 6, src: "https://images.unsplash.com/photo-1542320868-f4d80389e1c4?q=80&w=800", alt: "Keyboard setup", category: "Fun Game Moments", className: "md:col-span-1 md:row-span-1" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="pb-24">
      <section className="bg-zinc-900/30 border-b border-white/5 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Hostel <span className="text-cyan-400">Gallery</span></h1>
        <p className="text-zinc-400 max-w-2xl mx-auto px-4">
          A glimpse into the late-night sessions, epic comebacks, and pure fun at SDM Hostel Paglus.
        </p>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          {images.map((img, i) => (
            <motion.div 
              key={img.id}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${img.className || ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedImage(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-wider mb-1 block">{img.category}</span>
                <h3 className="text-white font-display font-semibold text-lg leading-tight">{img.alt}</h3>
              </div>
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-2xl transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
