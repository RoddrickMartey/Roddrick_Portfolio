// HomePage.jsx
import ImageShowcase from "@/components/ImageShowcase";
import { useUserDetailsStore } from "@/hooks/useUserDetailsStore";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

function HomePage() {
  const { data } = useUserDetailsStore();
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden text-foreground">
      <section className="max-w-6xl mx-auto min-h-screen px-6 md:px-12 lg:px-20 flex flex-col-reverse items-center justify-center gap-14 lg:flex-row lg:gap-20">

        <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left max-w-xl w-full">
          {data.availableForWork && (
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for work
              </span>
            </motion.div>
          )}
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-2">
            <p className="text-xs font-mono tracking-[4px] text-primary/50 uppercase">Hello, I'm</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
              {data.fullName || "Your Full Name"}
            </h1>
          </motion.div>
          <motion.p {...fadeUp(0.2)} className="text-base sm:text-lg text-primary/80 font-medium">
            {data.headline || "Your professional headline"}
          </motion.p>
          <motion.p {...fadeUp(0.3)} className="text-base sm:text-lg font-light leading-relaxed text-muted-foreground">
            Building delightful web & mobile experiences — blending clean code, thoughtful design, and a deep curiosity for solving real problems.
          </motion.p>
          {data.location && (
            <motion.p {...fadeUp(0.35)} className="text-sm text-muted-foreground/60 font-mono tracking-wide">
              📍 {data.location}
            </motion.p>
          )}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap justify-center lg:justify-start gap-3 mt-2">
            <Button onClick={() => navigate("/contact")} className="rounded-full px-6">Contact Me</Button>
            <Button variant="outline" onClick={() => navigate("/projects")} className="rounded-full px-6">View Projects</Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="flex-shrink-0 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[340px]"
        >
          <ImageShowcase src={data.homeImage} caption="Hi there!" />
        </motion.div>

      </section>
    </main>
  );
}

export default HomePage;
