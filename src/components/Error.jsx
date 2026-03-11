import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50 px-6">

      {/* Animated red glow blob */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #ef4444 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-center justify-center w-20 h-20 rounded-full border border-red-500/20 bg-red-500/10 mb-6"
      >
        <motion.div
          animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <AlertTriangle className="w-9 h-9 text-red-500" />
        </motion.div>

        {/* Ping ring */}
        <motion.div
          animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-red-500/40"
        />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col items-center gap-2 text-center max-w-md"
      >
        <p className="text-xs font-mono tracking-[4px] text-red-500/60 uppercase">
          Error
        </p>
        <p className="text-base font-medium text-foreground leading-relaxed">
          {message}
        </p>
      </motion.div>

      {/* Retry button — only shows if onRetry is passed */}
      {onRetry && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </motion.button>
      )}

    </div>
  );
}
