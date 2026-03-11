import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CLIP = "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

export default function ImageShowcase({ src, alt = "", caption, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative flex-shrink-0 select-none cursor-default", className)}
    >
      {/* Spinning gradient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{
          clipPath: CLIP,
          background: "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f59e0b, #10b981, #6366f1)",
          transform: "scale(1.06)",
          opacity: 0.75,
        }}
        aria-hidden="true"
      />

      {/* Glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: CLIP,
          background: "radial-gradient(circle at 50% 50%, #a855f760, transparent 70%)",
          filter: "blur(12px)",
          transform: "scale(1.06)",
        }}
        aria-hidden="true"
      />

      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="relative w-full overflow-hidden"
        style={{ clipPath: CLIP, aspectRatio: "1 / 1" }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Shimmer on hover */}
        <motion.div
          initial={{ x: "-100%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {caption && (
          <div className="absolute inset-x-0 bottom-0 px-4 pt-8 pb-3 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <p className="text-sm font-medium text-white drop-shadow">{caption}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
