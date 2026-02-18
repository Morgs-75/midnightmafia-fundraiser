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

  // Track time on page to increase pulse urgency
  const [timeOnPage, setTimeOnPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Random delay for pulsing animation (0-5 seconds)
  const pulseDelay = (number * 1.618) % 5;

  // Calculate pulse parameters based on time on page
  const repeatDelay = Math.max(0.5, 3 - timeOnPage * 0.2);
  const glowIntensity = Math.min(0.7, 0.4 + timeOnPage * 0.025);

  const isClickable = status === "available";
  const isSold = status === "sold";
  const isHeld = status === "held";

  const handleClick = () => {
    if (isClickable) {
      onSelect(number);
    } else if (isSold && onViewMessage) {
      onViewMessage(data);
    }
  };

  // Status fill/stroke for the front face SVG path
  const getFrontFill = () => {
    if (isTeamNumber) return "#1a0a2e";
    if (isSold) return "#1e0a2e";
    if (isHeld) return "#1a1a1a";
    if (isSelected) return "rgba(126, 34, 206, 0.4)";
    return "#1f1f2e";
  };

  const getFrontStroke = () => {
    if (isTeamNumber) return "#a855f7";
    if (isSold) return "#ec4899";
    if (isHeld) return "#ec4899";
    if (isSelected) return "#a855f7";
    return "#374151";
  };

  const getNumberColor = () => {
    if (isTeamNumber) return "#c084fc";
    if (isSold) return "#f9a8d4";
    if (isHeld) return "#6b7280";
    if (isSelected) return "#ffffff";
    return "#d1d5db";
  };

  // z-index so sold tiles (with tabs) sit above neighbours
  const zIndex = isSold ? 3 : isHeld ? 2 : 1;

  return (
    <div
      style={{ perspective: "600px", overflow: "visible", zIndex }}
      className="aspect-square relative"
      onClick={handleClick}
    >
      <motion.div
        animate={{ rotateY: isSold ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          overflow: "visible",
        }}
      >
        {/* ── FRONT FACE ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            overflow: "visible",
          }}
        >
          <svg
            viewBox="-25 -25 150 150"
            width="100%"
            height="100%"
            style={{ overflow: "visible", display: "block" }}
          >
            {/* Animated pulse for available tiles */}
            {isClickable && !isSelected && (
              <motion.path
                d={path}
                fill={getFrontFill()}
                stroke={getFrontStroke()}
                strokeWidth="1.5"
                animate={{
                  filter: [
                    "drop-shadow(0 0 0px rgba(168,85,247,0))",
                    `drop-shadow(0 0 8px rgba(168,85,247,${glowIntensity}))`,
                    "drop-shadow(0 0 0px rgba(168,85,247,0))",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: pulseDelay,
                  repeatDelay,
                }}
              />
            )}

            {/* Non-animated front path (held, selected, team) */}
            {(!isClickable || isSelected) && (
              <path
                d={path}
                fill={getFrontFill()}
                stroke={getFrontStroke()}
                strokeWidth="1.5"
                opacity={isHeld ? 0.6 : 1}
              />
            )}

            {/* Number text */}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="central"
              fill={getNumberColor()}
              fontSize="22"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {number}
            </text>

            {/* Team star */}
            {isTeamNumber && (
              <text x="50" y="72" textAnchor="middle" fontSize="12">
                ⭐
              </text>
            )}
          </svg>
        </div>

        {/* ── BACK FACE ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            overflow: "visible",
          }}
        >
          <svg
            viewBox="-25 -25 150 150"
            width="100%"
            height="100%"
            style={{ overflow: "visible", display: "block" }}
          >
            <defs>
              <clipPath
                id={`back-clip-${number}`}
                clipPathUnits="userSpaceOnUse"
              >
                <path d={path} />
              </clipPath>
            </defs>

            {/* Logo slice — desktop only.
                CSS rotateY(180deg) flips the X axis, so we pre-correct:
                col=0 → x offset = -(totalCols-1)*100  (shows right edge of image → after flip = left = correct)
                col=9 → x offset = 0                   (shows left edge of image → after flip = right = correct) */}
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

            {/* Dark overlay */}
            <path d={path} fill="rgba(0,0,0,0.35)" />

            {/* Buyer name */}
            {displayName && (
              <text
                x="50"
                y="58"
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
