import ImageShowcase from "@/components/ImageShowcase";
import { useUserDetailsStore } from "@/hooks/useUserDetailsStore";
import { motion } from "framer-motion";
import React from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

function AboutPage() {
  const { data } = useUserDetailsStore();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute -bottom-40 left-1/3 w-[350px] h-[350px] rounded-full bg-pink-500/5 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:px-12 lg:px-20 flex flex-col gap-24">

        {/* ── HERO ROW ── */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-20">

          {/* Image */}
          <motion.div
            {...fadeUp(0)}
            className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px]"
          >
            <ImageShowcase src={data.aboutImage} caption="That's me" />
          </motion.div>

          {/* Name + bio intro */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <motion.div {...fadeUp(0.1)}>
              <p className="text-xs font-mono tracking-[4px] text-primary/60 uppercase mb-2">
                Full-Stack Developer
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                {data.fullName}
              </h1>
            </motion.div>

            <motion.p
              {...fadeUp(0.2)}
              className="max-w-xl text-base md:text-lg font-light leading-relaxed text-muted-foreground"
            >
              {data.bio[0]}
            </motion.p>

            {/* Available badge */}
            {data.availableForWork && (
              <motion.div {...fadeUp(0.3)} className="flex justify-center md:justify-start">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for work
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── ABOUT PARAGRAPHS ── */}
        <motion.div {...fadeUp(0.2)} className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono tracking-[4px] text-primary/50 uppercase">My Story</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          {data.bio.slice(1).map((para, i) => (
            <motion.p
              key={i}
              {...fadeUp(0.25 + i * 0.05)}
              className="text-base md:text-lg font-light leading-relaxed tracking-wide text-muted-foreground"
            >
              {para}
            </motion.p>
          ))}
        </motion.div>

        {/* ── SKILLS ── */}
        <motion.div {...fadeUp(0.3)} className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono tracking-[4px] text-primary/50 uppercase">Skills</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {data.skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="group relative px-4 py-3 rounded-xl border border-border bg-muted/40 hover:bg-muted/80 hover:border-primary/30 transition-all duration-200 text-center overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-transparent rounded-xl" />
                <p className="relative text-sm font-medium text-foreground">{skill}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── TECH STACK ── */}
        <motion.div {...fadeUp(0.4)} className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono tracking-[4px] text-primary/50 uppercase">Tech Stack</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-wrap gap-3">
            {data.techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.03, duration: 0.35, ease: "easeOut" }}
                whileHover={{ y: -2, scale: 1.05 }}
                className="group relative px-4 py-2 rounded-full border border-border bg-muted/30 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full" />
                <p className="relative text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {tech}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}

export default AboutPage;
