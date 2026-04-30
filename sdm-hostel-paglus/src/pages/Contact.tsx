import { motion } from "framer-motion";
import { Clock, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export default function Contact() {
  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-zinc-900/30 border-b border-white/5 py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-transparent to-transparent pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 relative z-10">Get in <span className="text-fuchsia-400">Touch</span></h1>
        <p className="text-zinc-400 max-w-2xl mx-auto px-4 relative z-10">
          Have a question, need to fix a network issue, or want to book a slot for the weekend? We're here for you.
        </p>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Info & Map */}
          <motion.div 
            className="space-y-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-3xl font-display font-bold mb-8">Contact Information</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center flex-shrink-0 text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">Address</h4>
                    <p className="text-zinc-400 mt-1">SDM Hostel, Block A<br />Game Room 404, Campus Road</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center flex-shrink-0 text-fuchsia-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">Phone</h4>
                    <p className="text-zinc-400 mt-1">WhatsApp: +91 9483284457</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center flex-shrink-0 text-amber-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">Opening Hours</h4>
                    <p className="text-zinc-400 mt-1">Mon - Fri: 5:00 PM - 12:00 AM<br />Sat - Sun: 10:00 AM - 2:00 AM</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Button size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_0_15px_rgba(37,211,102,0.4)] border-none">
                <MessageCircle className="w-5 h-5 mr-2" /> Book via WhatsApp
              </Button>
            </div>

            {/* Embedded map placeholder */}
            <div className="w-full h-64 rounded-2xl overflow-hidden glass border border-white/10 relative">
              <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center filter grayscale opacity-50">
                 {/* Map Placeholder Image */}
                 <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-30" alt="Map" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                 <MapPin className="w-8 h-8 text-white mb-2" />
                 <span className="font-display font-bold text-white text-lg drop-shadow-md">SDM Hostel Location Here</span>
                 <span className="text-xs text-zinc-300 drop-shadow-md">Google Maps Embed Placeholder</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-white/10 bg-zinc-900/60 p-2 md:p-4">
              <CardContent className="p-6 md:p-8">
                <div className="mb-8 block">
                  <h2 className="text-2xl font-display font-bold text-white">Reserve a Slot</h2>
                  <p className="text-zinc-400 mt-2 text-sm">Secure your game session or tournament entry.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Phone / WhatsApp</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500/50 transition-colors"
                      placeholder="+1 234..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Game Selection</label>
                    <select className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500/50 transition-colors appearance-none">
                      <option value="" disabled selected>Select a game to book...</option>
                      <option value="valorant">Valorant (PC)</option>
                      <option value="fifa">FIFA 24 (Console)</option>
                      <option value="tekken">Tekken 8 (Console)</option>
                      <option value="other">Other / Group Booking</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Message (Optional)</label>
                    <textarea 
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500/50 transition-colors resize-none h-32"
                      placeholder="Any specific time or opponent requests?"
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" /> Submit Reservation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
