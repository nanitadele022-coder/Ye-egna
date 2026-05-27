/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function AnimatedStaircase() {
  // SVG drawing of a couple climbing steps of golden coins and money blocks
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[4/3] flex items-center justify-center p-2 select-none pointer-events-none">
      <div className="absolute inset-0 bg-radial from-pink-100/40 via-blue-50/20 to-transparent blur-2xl rounded-full" />
      
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_30px_rgba(244,143,177,0.15)]"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF5F7" />
            <stop offset="100%" stopColor="#EDF6FF" />
          </linearGradient>
          
          <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F48FB1" />
            <stop offset="100%" stopColor="#FF4081" />
          </linearGradient>

          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#90CAF9" />
            <stop offset="100%" stopColor="#2196F3" />
          </linearGradient>

          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>
          
          <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF59D" />
            <stop offset="100%" stopColor="#FBC02D" />
          </linearGradient>
          
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Soft Background Plate */}
        <rect width="400" height="300" rx="24" fill="url(#skyGrad)" opacity="0.4" />

        {/* Dreamy clouds */}
        <motion.path
          d="M30 240 C30 220, 60 210, 80 220 C90 200, 120 200, 130 215 C140 210, 160 215, 160 230 C160 245, 120 250, 80 250 C40 248, 30 240, 30 240 Z"
          fill="#FFFFFF"
          opacity="0.85"
          animate={{ x: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.path
          d="M260 80 C260 65, 280 55, 300 65 C310 50, 335 50, 345 60 C355 55, 370 60, 370 70 C370 85, 340 90, 300 90 C270 88, 260 80, 260 80 Z"
          fill="#FFFFFF"
          opacity="0.9"
          animate={{ x: [4, -4, 4] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />

        {/* Glimmer Sparkles */}
        {[
          { cx: 80, cy: 90, r: 4 },
          { cx: 330, cy: 110, r: 6 },
          { cx: 210, cy: 40, r: 5 },
          { cx: 140, cy: 120, r: 3 }
        ].map((star, i) => (
          <motion.circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#FFF59D"
            filter="url(#softGlow)"
            animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.3, 0.9, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
          />
        ))}

        {/* Sparkle shapes */}
        <motion.path
          d="M 280,140 Q 280,150 290,150 Q 280,150 280,160 Q 280,150 270,150 Q 280,150 280,140"
          fill="#FFE082"
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        
        <motion.path
          d="M 100,50 Q 100,60 110,60 Q 100,60 100,70 Q 100,60 90,60 Q 100,60 100,50"
          fill="#FFB300"
          animate={{ scale: [0.7, 1.2, 0.7], opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />

        {/* 3D Money Stairs (Ethiopian Birr Steps) */}
        {/* Step 1 (Bottom Left) */}
        <g id="step1">
          {/* Back 3D border */}
          <path d="M 40,265 L 120,265 L 100,285 L 20,285 Z" fill="#E0AF11" />
          <path d="M 20,285 L 100,285 L 100,295 L 20,295 Z" fill="#C59305" />
          {/* Top Surface */}
          <path d="M 40,260 L 120,260 L 100,280 L 20,280 Z" fill="url(#goldGrad)" />
          {/* Front Face */}
          <rect x="20" y="280" width="80" height="15" rx="2" fill="#E65100" opacity="0.15" />
          {/* Embossed text marker */}
          <text x="50" y="275" fill="#FFE082" fontSize="9" fontWeight="bold" fontFamily="monospace">ETB</text>
        </g>

        {/* Step 2 */}
        <g id="step2">
          <path d="M 100,215 L 180,215 L 160,235 L 80,235 Z" fill="#E0AF11" />
          <path d="M 80,235 L 160,235 L 160,245 L 80,245 Z" fill="#C59305" />
          <path d="M 100,210 L 180,210 L 160,230 L 80,230 Z" fill="url(#goldGrad)" />
          <text x="110" y="225" fill="#FFE082" fontSize="9" fontWeight="bold" fontFamily="monospace">ETB</text>
        </g>

        {/* Step 3 */}
        <g id="step3">
          <path d="M 160,165 L 240,165 L 220,185 L 140,185 Z" fill="#E0AF11" />
          <path d="M 140,185 L 220,185 L 220,195 L 140,195 Z" fill="#C59305" />
          <path d="M 160,160 L 240,160 L 220,180 L 140,180 Z" fill="url(#goldGrad)" />
          <text x="170" y="175" fill="#FFE082" fontSize="9" fontWeight="bold" fontFamily="monospace">ETB</text>
        </g>

        {/* Step 4 */}
        <g id="step4">
          <path d="M 220,115 L 300,115 L 280,135 L 200,135 Z" fill="#E0AF11" />
          <path d="M 200,135 L 280,135 L 280,145 L 200,145 Z" fill="#C59305" />
          <path d="M 220,110 L 300,110 L 280,130 L 200,130 Z" fill="url(#goldGrad)" />
          <text x="230" y="125" fill="#FFE082" fontSize="9" fontWeight="bold" fontFamily="monospace">ETB</text>
        </g>

        {/* Step 5 (Top Right Dream Summit) */}
        <g id="step5">
          {/* Beautiful glowing peak banner */}
          <path d="M 280,65 L 360,65 L 340,85 L 260,85 Z" fill="#FF8A80" opacity="0.4" filter="url(#softGlow)" />
          <path d="M 280,65 L 360,65 L 340,85 L 260,85 Z" fill="#E0AF11" />
          <path d="M 260,85 L 340,85 L 340,95 L 260,95 Z" fill="#C59305" />
          <path d="M 280,60 L 360,60 L 340,80 L 260,80 Z" fill="url(#goldGrad)" />
          <text x="285" y="75" fill="#FFFFFF" fontSize="10" fontWeight="bold" filter="url(#softGlow)">DREAM</text>
          
          {/* Treasure Box / Golden Heart on peak */}
          <motion.path
            d="M 320,40 C 315,35 305,35 300,42 C 295,35 285,35 280,40 C 275,45 285,55 300,65 C 315,55 325,45 320,40 Z"
            fill="url(#pinkGrad)"
            filter="url(#softGlow)"
            animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </g>

        {/* THE COUPLE CLIMBING STAIRS TOGETHER */}
        {/* Animated container for Climbing action */}
        <g id="climbing-couple">
          {/* Husband (In Blue) */}
          <g id="husband">
            {/* Body Lines */}
            <motion.g
              animate={{ 
                y: [-2, 2, -2],
                rotate: [-1, 2, -1]
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              {/* Blue pants / legs */}
              <line x1="165" y1="170" x2="160" y2="195" stroke="#1565C0" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="175" y1="170" x2="183" y2="192" stroke="#1E88E5" strokeWidth="4.5" strokeLinecap="round" />
              
              {/* Torso/Coat in Blue gradient */}
              <rect x="156" y="132" width="24" height="40" rx="10" fill="url(#blueGrad)" />
              
              {/* Elegant Scarf */}
              <path d="M 158,135 C158,130 178,130 178,135 L 188,148" stroke="#FFD54F" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Head */}
              <circle cx="168" cy="122" r="9" fill="#FCE4EC" />
              <path d="M 161,118 C163,115 173,115 175,119" stroke="#37474F" strokeWidth="3.5" strokeLinecap="round" /> {/* Hair */}
              
              {/* Left hand (reaching back/climbing) */}
              <line x1="156" y1="145" x2="148" y2="158" stroke="#90CAF9" strokeWidth="3" strokeLinecap="round" />
            </motion.g>
          </g>

          {/* Wife (In Pink) */}
          <g id="wife">
            <motion.g
              animate={{ 
                y: [2, -2, 2],
                rotate: [2, -1, 2]
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              {/* Pink Elegant Dress / legs */}
              <line x1="195" y1="172" x2="190" y2="195" stroke="#EC407A" strokeWidth="4" strokeLinecap="round" />
              <line x1="205" y1="172" x2="212" y2="188" stroke="#D81B60" strokeWidth="4" strokeLinecap="round" />
              
              {/* Dress gradient */}
              <path d="M 190,172 L 210,172 L 215,140 L 185,140 Z" fill="url(#pinkGrad)" />
              <circle cx="198" cy="138" r="10" fill="url(#pinkGrad)" />
              
              {/* Head */}
              <circle cx="198" cy="122" r="8.5" fill="#FFE0B2" />
              {/* Long Hair */}
              <path d="M 193,116 C190,125 190,132 192,136" stroke="#4E342E" strokeWidth="4" strokeLinecap="round" />
              <path d="M 194,118 C198,114 204,115 204,120" stroke="#4E342E" strokeWidth="3.5" strokeLinecap="round" />
              
              {/* Right hand (reaching forward) */}
              <line x1="208" y1="145" x2="218" y2="135" stroke="#F48FB1" strokeWidth="3" strokeLinecap="round" />
            </motion.g>
          </g>

          {/* HOLDING HANDS CONNECTION (SHARED SUPPORT) */}
          <motion.g
            animate={{ 
              y: [-1, 1, -1]
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            {/* Husband's right hand holding Wife's left hand */}
            <path
              d="M 178,146 Q 188,149 191,146"
              stroke="#F0F4C3"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              filter="url(#softGlow)"
            />
          </motion.g>
        </g>

        {/* Dynamic floating hearts (emotional couples vibe) */}
        {[
          { x: 190, y: 110, scale: 0.8, delay: 0 },
          { x: 140, y: 150, scale: 0.6, delay: 1.5 },
          { x: 230, y: 90, scale: 0.9, delay: 0.8 },
          { x: 280, y: 110, scale: 0.7, delay: 2 }
        ].map((heart, index) => (
          <motion.path
            key={index}
            d="M 12,5 C 10,1 5,1 3,3 C 1,5 1,10 5,14 C 10,18 12,20 12,20 C 12,20 14,18 19,14 C 23,10 23,5 21,3 C 19,1 14,1 12,5 Z"
            fill={index % 2 === 0 ? "url(#pinkGrad)" : "url(#blueGrad)"}
            opacity="0.8"
            initial={{ 
              x: heart.x, 
              y: heart.y, 
              scale: 0.1, 
              opacity: 0 
            }}
            animate={{ 
              y: [heart.y, heart.y - 60],
              scale: [0.1, heart.scale, 0.4],
              opacity: [0, 0.9, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5, 
              delay: heart.delay,
              ease: "easeOut" 
            }}
            className="origin-center"
          />
        ))}

        {/* Bottom ground elements, flowers */}
        <g id="ground-deco" opacity="0.6">
          <circle cx="30" cy="295" r="16" fill="#A5D6A7" />
          <circle cx="370" cy="292" r="14" fill="#81C784" />
          <circle cx="385" cy="296" r="20" fill="#A5D6A7" />
          <circle cx="15" cy="298" r="10" fill="#81C784" />
        </g>
      </svg>
    </div>
  );
}
