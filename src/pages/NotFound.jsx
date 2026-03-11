import React from "react";
import { motion } from "framer-motion";
import { Ghost, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center bg-background overflow-hidden">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* 404 big text behind */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute select-none pointer-events-none"
        style={{
          fontSize: "clamp(160px, 30vw, 320px)",
          fontWeight: 900,
          letterSpacing: "-0.05em",
          color: "transparent",
          WebkitTextStroke: "1px hsl(var(--border))",
          lineHeight: 1,
          opacity: 0.25,
        }}
      >
        404
      </motion.div>

      {/* Ghost icon */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-6 z-10"
      >
        {/* Float animation wrapper */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center justify-center w-24 h-24 rounded-full border border-primary/20 bg-primary/10"
        >
          <Ghost className="w-12 h-12 text-primary" />
          {/* Ping ring */}
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-primary/30"
          />
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-3 mb-8"
      >
        <p className="text-xs font-mono tracking-[4px] text-primary/50 uppercase">
          404 — Not Found
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          You're lost in space
        </h1>
        <p className="max-w-sm text-base font-light leading-relaxed text-muted-foreground">
          This page doesn't exist or was moved. Let's get you back to somewhere familiar.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 flex gap-3"
      >
        <Button
          onClick={() => navigate("/")}
          className="rounded-full px-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="rounded-full px-6"
        >
          Go Back
        </Button>
      </motion.div>

    </div>
  );
}

export default NotFound;
