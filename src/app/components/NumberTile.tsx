import { motion } from "motion/react";
import { NumberData } from "../types";
import { useState, useEffect } from "react";

interface NumberTileProps {
  data: NumberData;
  isSelected: boolean;
  onSelect: (number: number) => void;
  onViewMessage?: (data: NumberData) => void;
  col: number;
  row: number;
  path: string;
  totalCols?: number;
  totalRows?: number;
}

// Pastel colour palette
const COLORS = {
  available: { gradTop: "#5b21b6", gradBot: "#0f0520", stroke: "#c084fc", glowRgb: "192,132,252", text: "#ede9fe" },
  selected:  { gradTop: "#7c3aed", gradBot: "#2e1065", stroke: "#a855f7", glowRgb: "168,85,247",  text: "#ffffff" },
  sold:      { gradTop: "#9d174d", gradBot: "#200010", stroke: "#f9a8d4", glowRgb: "249,168,212", text: "#fce7f3" },
  held:      { gradTop: "#1f2937", gradBot: "#080c12", stroke: "#374151", glowRgb: null,           text: "#4b5563" },
  team:      { gradTop: "#1e40af", gradBot: "#060e2a", stroke: "#93c5fd", glowRgb: "147,197,253", text: "#dbeafe" },
};

export function NumberTile({
  data,
  isSelected,
  onSelect,
  onViewMessage,
  col,
  row,
  path,
  totalCols = 10,
  totalRows = 20,
}: NumberTileProps) {
  const { number, status, displayName, isTeamNumber } = data;

  const [timeOnPage, setTimeOnPage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTimeOnPage(p => p + 1), 10000);
    return () => clearInterval(interval);
  }, []);

  const isClickable = status === "available";
  const isSold      = status === "sold";
  const isHeld      = status === "held";

  const scheme = isTeamNumber ? COLORS.team
    : isSold      ? COLORS.sold
    : isHeld      ? COLORS.held
    : isSelected  ? COLORS.selected
    : COLORS.available;

  // Glow grows more urgent over time
  const pulseDelay   = (number * 1.618) % 4;
  const repeatDelay  = Math.max(0.5, 3 - timeOnPage * 0.2);
  const glowPeak     = Math.min(0.85, 0.5 + timeOnPage * 0.03);

  const glowFilter = (intensity: number) => scheme.glowRgb
    ? `drop-shadow(0 0 4px rgba(${scheme.glowRgb},${intensity})) drop-shadow(0 0 14px rgba(${scheme.glowRgb},${intensity * 0.5})) drop-shadow(0 0 28px rgba(${scheme.glowRgb},${intensity * 0.2}))`
    : "none";

  const handleClick = () => {
    if (isClickable)           onSelect(number);
    else if (isSold && onViewMessage) onViewMessage(data);
  };

  const zIndex = isSold ? 3 : isHeld ? 2 : 1;

  // Unique gradient IDs scoped per tile
  const gradId  = `gf-${number}`;
  const glossId = `gl-${number}`;

  return (
    <div
      style={{ perspective: "600px", overflow: "visible", zIndex }}
      className="aspect-square relative"
      onClick={handleClick}
    >
      <motion.div
        animate={{ rotateY: isSold ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d", overflow: "visible" }}
      >
        {/* ── FRONT FACE ── */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", overflow: "visible" }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
            <defs>
              {/* Diagonal gradient: top-left lighter → bottom-right near-black */}
              <linearGradient id={gradId} x1="0" y1="0" x2="60" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor={scheme.gradTop} />
                <stop offset="100%" stopColor={scheme.gradBot} />
              </linearGradient>
              {/* Gloss: white sheen fading from top */}
              <linearGradient id={glossId} x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="white" stopOpacity="0.18" />
                <stop offset="50%"  stopColor="white" stopOpacity="0.04" />
                <stop offset="100%" stopColor="white" stopOpacity="0"    />
              </linearGradient>
            </defs>

            {/* Base fill — animated glow for available tiles */}
            {isClickable && !isSelected ? (
              <motion.path
                d={path}
                fill={`url(#${gradId})`}
                stroke={scheme.stroke}
                strokeWidth="2"
                animate={{
                  filter: [
                    glowFilter(0.3),
                    glowFilter(glowPeak),
                    glowFilter(0.3),
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: pulseDelay, repeatDelay }}
              />
            ) : (
              <path
                d={path}
                fill={`url(#${gradId})`}
                stroke={scheme.stroke}
                strokeWidth="2"
                opacity={isHeld ? 0.5 : 1}
                style={isSelected ? { filter: glowFilter(0.7) } : undefined}
              />
            )}

            {/* Gloss overlay */}
            <path d={path} fill={`url(#${glossId})`} stroke="none" />

            {/* Number */}
            <text
              x="50" y="50"
              textAnchor="middle"
              dominantBaseline="central"
              fill={scheme.text}
              fontSize="22"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {number}
            </text>

            {/* Team star */}
            {isTeamNumber && (
              <text x="50" y="72" textAnchor="middle" fontSize="12">⭐</text>
            )}
          </svg>
        </div>

        {/* ── BACK FACE ── */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", overflow: "visible", filter: `drop-shadow(0 0 4px rgba(249,168,212,0.5)) drop-shadow(0 0 14px rgba(249,168,212,0.25)) drop-shadow(0 0 28px rgba(249,168,212,0.1))` }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
            <defs>
              <clipPath id={`back-clip-${number}`} clipPathUnits="userSpaceOnUse">
                <path d={path} />
              </clipPath>
            </defs>

            <g clipPath={`url(#back-clip-${number})`}>
              <image
                href="/assets/logo.png"
                x={(col - (totalCols - 1)) * 100}
                y={-row * 100}
                width={totalCols * 100}
                height={totalRows * 100}
                preserveAspectRatio="none"
              />
            </g>

            <path d={path} fill="rgba(0,0,0,0.35)" />

            {displayName && (
              <text
                x="50" y="58"
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize="9"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {displayName}
              </text>
            )}
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
