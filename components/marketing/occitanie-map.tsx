"use client";

import { motion } from "framer-motion";

// ─── Department definitions ──────────────────────────────────────────────────
// Coordinate system: x = lon * 110 + 20,  y = (45.0 - lat) * 140 + 10
// Approximate simplified polygons for the 13 departments of Occitanie

const DEPARTMENTS = [
  // Northernmost tier
  {
    id: "46",
    name: "Lot",
    path: "M130,15 L260,15 L260,130 L185,138 L130,130 Z",
    served: false,
  },
  {
    id: "12",
    name: "Aveyron",
    path: "M260,15 L390,15 L396,140 L305,158 L260,130 Z",
    served: false,
  },
  {
    id: "48",
    name: "Lozère",
    path: "M390,15 L458,20 L462,122 L396,140 Z",
    served: false,
  },
  {
    id: "30",
    name: "Gard",
    path: "M458,20 L542,92 L542,228 L458,228 L462,122 Z",
    served: false,
  },
  // Middle tier
  {
    id: "32",
    name: "Gers",
    path: "M20,118 L130,130 L130,205 L65,255 L20,238 Z",
    served: true,
  },
  {
    id: "82",
    name: "Tarn-et-Garonne",
    path: "M130,130 L185,138 L260,130 L248,208 L130,205 Z",
    served: true,
  },
  {
    id: "31",
    name: "Haute-Garonne",
    path: "M185,138 L260,130 L305,158 L288,250 L220,264 L178,258 L162,208 Z",
    served: true,
    capital: true,
  },
  {
    id: "81",
    name: "Tarn",
    path: "M305,158 L396,140 L408,168 L356,248 L288,250 Z",
    served: true,
  },
  {
    id: "34",
    name: "Hérault",
    path: "M396,140 L462,122 L458,228 L415,260 L356,248 Z",
    served: false,
  },
  // Southern tier
  {
    id: "65",
    name: "Hautes-Pyrénées",
    path: "M20,238 L65,255 L108,285 L168,312 L158,348 L76,352 L20,342 Z",
    served: false,
  },
  {
    id: "09",
    name: "Ariège",
    path: "M178,258 L220,264 L288,250 L293,332 L190,350 L158,348 L168,312 Z",
    served: true,
  },
  {
    id: "11",
    name: "Aude",
    path: "M288,250 L356,248 L415,260 L372,342 L293,332 Z",
    served: false,
  },
  {
    id: "66",
    name: "Pyrénées-Orientales",
    path: "M415,260 L458,228 L542,228 L542,328 L415,328 Z",
    served: false,
  },
] as const;

// Toulouse city marker
const TOULOUSE = { x: 215, y: 198 };

// ─── Component ───────────────────────────────────────────────────────────────

interface OccitanieMapProps {
  className?: string;
}

export function OccitanieMap({ className = "" }: OccitanieMapProps) {
  return (
    <svg
      viewBox="0 0 562 368"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Carte des zones d'intervention ASO en Occitanie"
      role="img"
    >
      {/* Department fills */}
      {DEPARTMENTS.map((dept, i) => (
        <motion.path
          key={dept.id}
          d={dept.path}
          fill={dept.served ? "rgba(220,38,38,0.25)" : "rgba(255,255,255,0.04)"}
          stroke={dept.served ? "rgba(220,38,38,0.55)" : "rgba(255,255,255,0.12)"}
          strokeWidth={dept.served ? 1.5 : 1}
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
        />
      ))}

      {/* Department number labels */}
      {[
        { id: "46", x: 193, y: 78 },
        { id: "12", x: 315, y: 82 },
        { id: "48", x: 420, y: 90 },
        { id: "30", x: 496, y: 158 },
        { id: "32", x: 75, y: 182 },
        { id: "82", x: 188, y: 172 },
        { id: "31", x: 228, y: 200 },
        { id: "81", x: 340, y: 198 },
        { id: "34", x: 420, y: 188 },
        { id: "65", x: 80, y: 290 },
        { id: "09", x: 225, y: 298 },
        { id: "11", x: 332, y: 292 },
        { id: "66", x: 480, y: 278 },
      ].map((label, i) => {
        const dept = DEPARTMENTS.find((d) => d.id === label.id);
        return (
          <motion.text
            key={label.id}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill={dept?.served ? "rgba(252,165,165,0.9)" : "rgba(255,255,255,0.28)"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
          >
            {label.id}
          </motion.text>
        );
      })}

      {/* Toulouse city marker */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.7, type: "spring" }}
        style={{ transformOrigin: `${TOULOUSE.x}px ${TOULOUSE.y}px` }}
      >
        {/* Ping ring */}
        <motion.circle
          cx={TOULOUSE.x}
          cy={TOULOUSE.y}
          r={10}
          fill="none"
          stroke="rgba(239,68,68,0.4)"
          strokeWidth={1.5}
          animate={{ r: [10, 18], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.4 }}
        />
        {/* Dot */}
        <circle
          cx={TOULOUSE.x}
          cy={TOULOUSE.y}
          r={4}
          fill="#ef4444"
        />
        {/* Label */}
        <text
          x={TOULOUSE.x + 8}
          y={TOULOUSE.y - 6}
          fontSize="9.5"
          fontWeight="700"
          fill="white"
          letterSpacing="0.04em"
        >
          TOULOUSE
        </text>
      </motion.g>

      {/* Subtle "Occitanie" watermark */}
      <text
        x="281"
        y="370"
        textAnchor="middle"
        fontSize="8"
        fontWeight="500"
        fill="rgba(255,255,255,0.18)"
        letterSpacing="0.2em"
      >
        OCCITANIE
      </text>
    </svg>
  );
}
