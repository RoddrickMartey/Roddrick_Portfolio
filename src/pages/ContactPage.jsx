import { useUserDetailsStore } from "@/hooks/useUserDetailsStore";
import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import SecretLogin from "./Auth/SecretLogin";
import { motion } from "framer-motion";

const SECRET_STR = "edith";
const SECRET_MAX_GAP_MS = 750;
const IGNORE_INPUTS = true;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

function ContactPage() {
  const { data } = useUserDetailsStore();
  const [secretOpen, setSecretOpen] = useState(false);

  useEffect(() => {
    let idx = 0;
    let lastTime = 0;
    const handleKey = (e) => {
      if (IGNORE_INPUTS) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      }
      if (e.key.length !== 1) return;
      const char = e.key.toLowerCase();
      const now = Date.now();
      if (idx > 0 && now - lastTime > SECRET_MAX_GAP_MS) idx = 0;
      if (char === SECRET_STR[idx]) {
        idx += 1;
        lastTime = now;
        if (idx === SECRET_STR.length) { setSecretOpen(true); idx = 0; }
      } else {
        idx = char === SECRET_STR[0] ? 1 : 0;
        if (idx === 1) lastTime = now;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!secretOpen) return;
    const t = setTimeout(() => setSecretOpen(false), 2 * 60 * 1000);
    return () => clearTimeout(t);
  }, [secretOpen]);

  const contactItems = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: data.email, href: `mailto:${data.email}` },
    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: data.phone, href: `tel:${data.phone}` },
    { icon: <MapPin className="w-5 h-5" />, label: "Location", value: data.location, href: null },
  ];

  const socials = [
    { name: "GitHub", url: data.socials.github, icon: <Github className="w-5 h-5" /> },
    { name: "LinkedIn", url: data.socials.linkedin, icon: <Linkedin className="w-5 h-5" /> },
    { name: "Website", url: data.socials.website, icon: <Globe className="w-5 h-5" /> },
  ].filter((s) => s.url);

  return (
    <main className="relative min-h-screen overflow-hidden text-foreground">

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[380px] h-[380px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute top-1/3 -right-32 w-[320px] h-[320px] rounded-full bg-pink-500/5 blur-[90px]" />
      </div>

      <section className="max-w-2xl mx-auto min-h-screen px-6 pt-28 pb-24 md:px-12 flex flex-col gap-14 justify-center">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="flex flex-col gap-3 text-center">
          <p className="text-xs font-mono tracking-[4px] text-primary/50 uppercase">
            Get In Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Contact Me
          </h1>
          <div className="mx-auto mt-1 h-[2px] w-16 rounded-full bg-primary/30" />
          <p className="mt-2 text-base font-light leading-relaxed text-muted-foreground max-w-lg mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision. Feel free to reach out.
          </p>
        </motion.div>

        {/* Contact Details */}
        <motion.div {...fadeUp(0.15)} className="flex flex-col gap-3">
          <p className="text-xs font-mono tracking-[4px] text-primary/50 uppercase mb-1">
            Direct
          </p>
          {contactItems.map((item, i) => (
  <motion.div
    key={i}
    whileHover={{ x: 4 }}
    transition={{ duration: 0.2 }}
    className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/30 transition-all duration-200"
  >
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
      {item.icon}
    </div>

    <div className="flex flex-col">
      <span className="text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        {item.label}
      </span>

      {item.href ? (
        <a
          href={item.href}
          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          {item.value}
        </a>
      ) : (
        <span className="text-sm font-medium text-foreground">
          {item.value}
        </span>
      )}
    </div>
  </motion.div>
))}
        </motion.div>

        {/* Socials */}
        {socials.length > 0 && (
          <motion.div {...fadeUp(0.25)} className="flex flex-col gap-3">
            <p className="text-xs font-mono tracking-[4px] text-primary/50 uppercase mb-1">
              Socials
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-muted/30 hover:bg-primary/10 hover:border-primary/40 hover:text-primary text-sm font-medium transition-all duration-200"
                >
                  {social.icon}
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

      </section>

      <SecretLogin open={secretOpen} onOpenChange={setSecretOpen} hideTrigger />
    </main>
  );
}

export default ContactPage;
