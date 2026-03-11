// Loading.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">

      {/* Grid background matches layout */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Spinner rings */}
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid transparent",
            borderTopColor: "hsl(var(--primary))",
            borderRightColor: "hsl(var(--primary))",
          }}
        />
        {/* Middle ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 rounded-full"
          style={{
            border: "2px solid transparent",
            borderTopColor: "#a855f7",
            borderLeftColor: "#a855f7",
          }}
        />
        {/* Inner dot */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-3 h-3 rounded-full bg-primary"
        />
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 flex flex-col items-center gap-1"
      >
        <p className="text-sm font-mono tracking-[4px] text-primary/60 uppercase">
          Loading
        </p>
        {/* Animated dots */}
        <div className="flex gap-1 mt-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-primary/60"
            />
          ))}
        </div>
      </motion.div>

    </div>
  );
}
