// App State
let worksheets = [];
let currentWorksheet = null;
let activePageIndex = 0;
let activeQuadrantIndex = 0;
let activeSlotIndex = null;
let activeItemIndex = 0;

// Built-in Illustration Library (High-quality SVGs)
const ILLUSTRATION_LIBRARY = {
  // Quadrant அ words
  mother: {
    name: "அம்மா (Mother)",
    category: "அ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="30" r="14" fill="#ffb7b2"/>
      <path d="M50 44c-15 0-25 10-25 25v15h50V69c0-15-10-25-25-25z" fill="#ffc6ff"/>
      <circle cx="43" cy="28" r="1.5" fill="#333"/>
      <circle cx="57" cy="28" r="1.5" fill="#333"/>
      <path d="M47 36s3 2 6 0" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M50 16c-10 0-14 6-14 12 0 1 .5 4 1 5 1-2 2-4 4-5 3-2 6-2 9 0 2 1 3 3 4 5 .5-1 1-3 1-5 0-6-4-12-14-12z" fill="#3d2612"/>
      <!-- Baby -->
      <circle cx="68" cy="55" r="9" fill="#ffd166"/>
      <path d="M68 64c-8 0-12 5-12 12v8h24v-8c0-7-4-12-12-12z" fill="#06d6a0"/>
      <path d="M38 52c6 4 18 10 24 4" stroke="#ffc6ff" stroke-width="6" stroke-linecap="round" fill="none"/>
    </svg>`
  },
  squirrel: {
    name: "அணில் (Squirrel)",
    category: "அ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M65 40c3-10 2-25-10-25-10 0-13 8-10 18-5 1-12 6-10 15 2 7 8 10 13 8v10c0 8-5 12-10 12-3 0-5-2-5-4 0-5-4-8-8-5s-3 8 2 11c6 4 14 3 18-3 5-7 5-15 5-17 5 3 11 1 15-5 3-4 2-12-2-16z" fill="#cd853f"/>
      <path d="M22 68c-10 0-15-15-8-22 5-5 15-2 18 8 2 8-4 14-10 14zm-4-12c-4 3-4 8 0 8 3 0 5-5 0-8z" fill="#a0522d"/>
      <circle cx="52" cy="24" r="2" fill="#000"/>
      <path d="M62 18l3-6M55 13l1-5" stroke="#cd853f" stroke-width="3" stroke-linecap="round"/>
      <path d="M45 42c3 1 6 1 8-1" stroke="#333" stroke-width="1" fill="none"/>
    </svg>`
  },
  arrow: {
    name: "அம்பு (Arrow)",
    category: "அ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 85l60-60" stroke="#8b5a2b" stroke-width="4" stroke-linecap="round"/>
      <path d="M72 28l15-15-5 20L72 28z" fill="#3b82f6"/>
      <path d="M12 88l8-4-4-8-4 12z" fill="#8b5a2b"/>
      <path d="M22 78l4-4M26 82l4-4M30 86l4-4" stroke="#f43f5e" stroke-width="2"/>
    </svg>`
  },
  rice: {
    name: "அரிசி (Rice Bowl)",
    category: "அ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50c0 18 13 30 30 30s30-12 30-30H20z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/>
      <path d="M22 50c5-12 15-16 28-16s23 4 28 16H22z" fill="#f8fafc"/>
      <!-- Rice grains -->
      <ellipse cx="35" cy="45" rx="3" ry="1.5" fill="#cbd5e1" transform="rotate(15 35 45)"/>
      <ellipse cx="45" cy="40" rx="3" ry="1.5" fill="#cbd5e1" transform="rotate(-20 45 40)"/>
      <ellipse cx="55" cy="42" rx="3" ry="1.5" fill="#cbd5e1" transform="rotate(30 55 42)"/>
      <ellipse cx="65" cy="46" rx="3" ry="1.5" fill="#cbd5e1" transform="rotate(-10 65 46)"/>
      <ellipse cx="50" cy="48" rx="3" ry="1.5" fill="#cbd5e1"/>
    </svg>`
  },

  // Quadrant ஆ words
  tree: {
    name: "ஆலமரம் (Banyan Tree)",
    category: "ஆ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M45 85V55h10v30H45z" fill="#78350f"/>
      <path d="M50 15C30 15 15 28 15 48c0 15 10 22 20 22 5 0 8-3 15-3s10 3 15 3c10 0 20-7 20-22 0-20-15-33-35-33z" fill="#15803d"/>
      <path d="M48 50v20M40 48v15M56 52v12M32 45v10M64 48v8" stroke="#b91c1c" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  },
  owl: {
    name: "ஆந்தை (Owl)",
    category: "ஆ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 35c0-12 8-20 20-20s20 8 20 20c0 18-6 35-20 35S30 53 30 35z" fill="#a16207"/>
      <path d="M40 70l-5 18 8-4 5 4-3-18zm20 0l5 18-8-4-5 4 3-18z" fill="#854d0e"/>
      <circle cx="42" cy="35" r="7" fill="#fff"/>
      <circle cx="58" cy="35" r="7" fill="#fff"/>
      <circle cx="42" cy="35" r="3.5" fill="#000"/>
      <circle cx="58" cy="35" r="3.5" fill="#000"/>
      <path d="M50 38l-3 6h6z" fill="#eab308"/>
      <path d="M35 18c-3-5-10-3-10-3s1 8 5 8zm30 0c3-5 10-3 10-3s-1 8-5 8z" fill="#854d0e"/>
    </svg>`
  },
  goat: {
    name: "ஆடு (Goat)",
    category: "ஆ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 40h35v15H35z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
      <path d="M40 55l-3 20M48 55l-1 20M62 55l1 20M68 55l3 20" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
      <path d="M25 32c0-8 6-12 12-6l5 14H28c-3 0-3-8-3-8z" fill="#cbd5e1"/>
      <circle cx="32" cy="32" r="1.5" fill="#000"/>
      <path d="M38 28c-2-6-8-8-8-8s2 6 4 8z" fill="#475569"/>
      <path d="M70 42c3-2 6 0 6 3s-3 5-6 2z" fill="#cbd5e1"/>
    </svg>`
  },
  turtle: {
    name: "ஆமை (Turtle)",
    category: "ஆ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 50c0-15 10-25 22-25s22 10 22 25H28z" fill="#15803d"/>
      <path d="M25 50h50v4H25z" fill="#166534"/>
      <!-- Legs and head -->
      <rect x="33" y="54" width="8" height="12" rx="4" fill="#166534"/>
      <rect x="59" y="54" width="8" height="12" rx="4" fill="#166534"/>
      <path d="M72 48c5 0 8-3 8-7s-3-5-7-2l-1 9z" fill="#166534"/>
      <circle cx="76" cy="41" r="1" fill="#fff"/>
      <!-- Shell pattern -->
      <path d="M38 38c5-5 12-5 17 0M45 28v22M55 28v22" stroke="#14532d" stroke-width="2"/>
    </svg>`
  },

  // Quadrant இ words
  leaf: {
    name: "இலை (Leaf)",
    category: "இ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 85c0 0-30-20-30-45C20 20 50 15 50 15s30 5 30 25c0 25-30 45-30 45z" fill="#22c55e"/>
      <path d="M50 88V15" stroke="#15803d" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 35l18-8M50 48l20-5M50 61l15-3M50 35L32 27M50 48L30 43M50 61l-15-3" stroke="#15803d" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  ginger: {
    name: "இஞ்சி (Ginger)",
    category: "இ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 45c-5 0-10 8-5 15 5 7 12 2 15-3M35 52c-2 6 2 15 10 15 8 0 10-8 5-15M42 45c5-10 18-12 22-2 4 10-5 15-12 12M50 55c0 10 10 18 20 12s5-15-5-15h-15z" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
      <path d="M28 47c2-3 8-1 5 4M46 59c3 3 8-2 4-6" stroke="#ca8a04" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  },
  idli: {
    name: "இட்லி (Idli)",
    category: "இ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Plate -->
      <ellipse cx="50" cy="55" rx="42" ry="32" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
      <ellipse cx="50" cy="55" rx="38" ry="28" fill="#e2e8f0"/>
      <!-- Idlis -->
      <ellipse cx="38" cy="48" rx="16" ry="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
      <ellipse cx="62" cy="52" rx="18" ry="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
      <!-- Chutney cup/spot -->
      <circle cx="50" cy="68" r="8" fill="#f97316"/>
      <circle cx="34" cy="62" r="5" fill="#22c55e"/>
    </svg>`
  },

  // Quadrant ஈ words
  fly: {
    name: "ஈ (Housefly)",
    category: "ஈ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="55" rx="12" ry="18" fill="#1e293b"/>
      <circle cx="50" cy="34" r="9" fill="#0f172a"/>
      <!-- Wings -->
      <ellipse cx="32" cy="45" rx="8" ry="22" fill="rgba(147, 197, 253, 0.6)" stroke="#60a5fa" stroke-width="1.5" transform="rotate(-30 32 45)"/>
      <ellipse cx="68" cy="45" rx="8" ry="22" fill="rgba(147, 197, 253, 0.6)" stroke="#60a5fa" stroke-width="1.5" transform="rotate(30 68 45)"/>
      <!-- Eyes -->
      <circle cx="45" cy="30" r="3" fill="#ef4444"/>
      <circle cx="55" cy="30" r="3" fill="#ef4444"/>
      <!-- Legs -->
      <path d="M42 50c-6-1-10 4-12 8M58 50c6-1 10 4 12 8M40 62c-6 2-8 8-8 12M60 62c6 2 8 8 8 12" stroke="#0f172a" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>`
  },
  termite: {
    name: "ஈசல் (Winged Termite)",
    category: "ஈ",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="50" cy="65" rx="6" ry="18" fill="#78350f"/>
      <circle cx="50" cy="44" r="5" fill="#451a03"/>
      <!-- Long Wings -->
      <ellipse cx="40" cy="38" rx="6" ry="28" fill="rgba(241, 245, 249, 0.8)" stroke="#cbd5e1" stroke-width="1.5" transform="rotate(-15 40 38)"/>
      <ellipse cx="60" cy="38" rx="6" ry="28" fill="rgba(241, 245, 249, 0.8)" stroke="#cbd5e1" stroke-width="1.5" transform="rotate(15 60 38)"/>
      <!-- Antennae -->
      <path d="M48 40c-3-4-8-3-8-3M52 40c3-4 8-3 8-3" stroke="#451a03" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    </svg>`
  },

  // General Educational Distractors (to choose from)
  ball: {
    name: "பந்து (Ball)",
    category: "distractors",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="35" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
      <path d="M22 32c10 8 10 28 0 36M78 32c-10 8-10 28 0 36M50 15v70" stroke="#fff" stroke-width="2.5" fill="none" stroke-dasharray="2 2"/>
      <circle cx="50" cy="50" r="10" fill="#f43f5e"/>
    </svg>`
  },
  ladder: {
    name: "ஏணி (Ladder)",
    category: "distractors",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 15l10 70M55 15l10 70" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>
      <path d="M38 28h20M40 42h20M42 56h20M44 70h20" stroke="#92400e" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  mouse: {
    name: "எலி (Mouse)",
    category: "distractors",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="45" cy="55" rx="20" ry="14" fill="#94a3b8"/>
      <circle cx="62" cy="48" r="8" fill="#94a3b8"/>
      <!-- Ears -->
      <circle cx="58" cy="38" r="6" fill="#f472b6"/>
      <circle cx="66" cy="38" r="6" fill="#f472b6"/>
      <!-- Tail -->
      <path d="M26 58c-8 2-12-6-16-4" stroke="#f472b6" stroke-width="3" stroke-linecap="round" fill="none"/>
      <!-- Eye & Nose -->
      <circle cx="64" cy="46" r="1.5" fill="#000"/>
      <circle cx="70" cy="49" r="2.5" fill="#f43f5e"/>
    </svg>`
  },
  crane: {
    name: "நாரை (Crane / Bird)",
    category: "distractors",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Body & Neck -->
      <ellipse cx="40" cy="50" rx="14" ry="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <path d="M50 46c5-10 6-22 1-28" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" fill="none"/>
      <!-- Head -->
      <circle cx="51" cy="18" r="5" fill="#f8fafc"/>
      <!-- Beak -->
      <path d="M54 18l18 3-18 1z" fill="#f59e0b"/>
      <!-- Legs -->
      <path d="M36 60v25M44 60v25M44 72h6" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  house: {
    name: "வீடு (House)",
    category: "distractors",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="45" width="50" height="38" fill="#ffedd5" stroke="#f97316" stroke-width="2"/>
      <path d="M20 45l30-22 30 22z" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
      <rect x="42" y="60" width="16" height="23" fill="#78350f"/>
      <circle cx="46" cy="72" r="1.5" fill="#fbbf24"/>
      <rect x="30" y="50" width="10" height="10" rx="2" fill="#93c5fd"/>
      <rect x="60" y="50" width="10" height="10" rx="2" fill="#93c5fd"/>
    </svg>`
  },
  sun: {
    name: "சூரியன் (Sun)",
    category: "distractors",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
      <!-- Rays -->
      <path d="M50 10v12M50 78v12M10 50h12M78 50h12M22 22l8 8M70 70l8 8M22 70l8-8M70 22l8-8" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
      <circle cx="44" cy="46" r="2" fill="#000"/>
      <circle cx="56" cy="46" r="2" fill="#000"/>
      <path d="M46 56s2 3 4 3 4-3 4-3" stroke="#000" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    </svg>`
  },
  umbrella: {
    name: "குடை (Umbrella)",
    category: "distractors",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50c0-20 13-30 30-30s30 10 30 30H20z" fill="#ec4899"/>
      <path d="M20 50c5 5 15 5 20 0s15-5 20 0 15 5 20 0" fill="#f472b6"/>
      <path d="M50 50v26c0 4-3 7-6 7" stroke="#475569" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M50 20v-4" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  flower: {
    name: "பூ (Flower)",
    category: "distractors",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="10" fill="#eab308" z-index="2"/>
      <!-- Petals -->
      <circle cx="50" cy="32" r="12" fill="#ec4899"/>
      <circle cx="50" cy="68" r="12" fill="#ec4899"/>
      <circle cx="32" cy="50" r="12" fill="#ec4899"/>
      <circle cx="68" cy="50" r="12" fill="#ec4899"/>
      <circle cx="37" cy="37" r="12" fill="#f43f5e"/>
      <circle cx="63" cy="63" r="12" fill="#f43f5e"/>
      <circle cx="37" cy="63" r="12" fill="#f43f5e"/>
      <circle cx="63" cy="37" r="12" fill="#f43f5e"/>
      <!-- Stem -->
      <path d="M50 78v12" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  deer: {
    name: "மான் (Deer)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 25c-15 0-20 8-20 20 0 10 6 15 10 18v18h20V63c4-3 10-8 10-18 0-12-5-20-20-20z" fill="#d97706"/>
      <path d="M40 76v12M60 76v12" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
      <path d="M32 30c-5-5-10 0-10 5s5 5 10-5zm36 0c5-5 10 0 10 5s-5 5-10-5z" fill="#b45309"/>
      <path d="M42 25c-3-8-10-10-10-10s2 8 6 10M58 25c3-8 10-10 10-10s-2 8-6 10" stroke="#78350f" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="44" cy="40" r="2.5" fill="#000"/>
      <circle cx="56" cy="40" r="2.5" fill="#000"/>
      <ellipse cx="50" cy="50" rx="3.5" ry="2" fill="#000"/>
      <path d="M48 54s2 2 4 0" stroke="#000" stroke-width="1.5" fill="none"/>
      <circle cx="45" cy="60" r="1.5" fill="#fff"/>
      <circle cx="55" cy="62" r="1.5" fill="#fff"/>
      <circle cx="50" cy="68" r="1.5" fill="#fff"/>
    </svg>`
  },
  tiger: {
    name: "புலி (Tiger)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="30" fill="#f97316"/>
      <circle cx="30" cy="30" r="8" fill="#f97316"/>
      <circle cx="70" cy="30" r="8" fill="#f97316"/>
      <circle cx="30" cy="30" r="4" fill="#ffedd5"/>
      <circle cx="70" cy="30" r="4" fill="#ffedd5"/>
      <path d="M22 45h10M22 55h8M78 45H68M78 55H70M50 22v8M45 22l2 6M55 22l-2 6" stroke="#000" stroke-width="3" stroke-linecap="round"/>
      <circle cx="40" cy="45" r="3.5" fill="#000"/>
      <circle cx="60" cy="45" r="3.5" fill="#000"/>
      <ellipse cx="50" cy="58" rx="8" ry="6" fill="#ffedd5"/>
      <polygon points="46,55 54,55 50,60" fill="#000"/>
    </svg>`
  },
  lion: {
    name: "சிங்கம் (Lion)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="36" fill="#b45309"/>
      <circle cx="50" cy="50" r="26" fill="#fbbf24"/>
      <circle cx="34" cy="32" r="6" fill="#fbbf24"/>
      <circle cx="66" cy="32" r="6" fill="#fbbf24"/>
      <circle cx="42" cy="44" r="3" fill="#000"/>
      <circle cx="58" cy="44" r="3" fill="#000"/>
      <polygon points="46,52 54,52 50,57" fill="#b45309"/>
      <path d="M50 57v4" stroke="#b45309" stroke-width="2"/>
    </svg>`
  },
  bear: {
    name: "கரடி (Bear)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="28" fill="#78350f"/>
      <circle cx="30" cy="30" r="8" fill="#78350f"/>
      <circle cx="70" cy="30" r="8" fill="#78350f"/>
      <circle cx="30" cy="30" r="4" fill="#d97706"/>
      <circle cx="70" cy="30" r="4" fill="#d97706"/>
      <ellipse cx="50" cy="56" rx="9" ry="7" fill="#d97706"/>
      <circle cx="50" cy="54" r="3" fill="#000"/>
      <circle cx="42" cy="42" r="2.5" fill="#000"/>
      <circle cx="58" cy="42" r="2.5" fill="#000"/>
    </svg>`
  },
  cheetah: {
    name: "சிறுத்தை (Cheetah)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="28" fill="#facc15"/>
      <circle cx="38" cy="38" r="2" fill="#000"/>
      <circle cx="62" cy="38" r="2" fill="#000"/>
      <circle cx="35" cy="52" r="2" fill="#000"/>
      <circle cx="65" cy="52" r="2" fill="#000"/>
      <circle cx="50" cy="68" r="2.5" fill="#000"/>
      <circle cx="45" cy="32" r="1.5" fill="#000"/>
      <circle cx="55" cy="32" r="1.5" fill="#000"/>
      <path d="M30 32c-2-6 4-10 6-6l2 10H30z" fill="#facc15"/>
      <path d="M70 32c2-6-4-10-6-6l-2 10h8z" fill="#facc15"/>
      <circle cx="43" cy="44" r="3" fill="#000"/>
      <circle cx="57" cy="44" r="3" fill="#000"/>
      <path d="M43 45c0 3 3 6 3 9M57 45c0 3-3 6-3 9" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/>
      <polygon points="48,54 52,54 50,57" fill="#000"/>
    </svg>`
  },
  wolf: {
    name: "ஓநாய் (Wolf)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,20 25,50 35,80 65,80 75,50" fill="#94a3b8"/>
      <polygon points="26,45 15,20 32,35" fill="#64748b"/>
      <polygon points="74,45 85,20 68,35" fill="#64748b"/>
      <polygon points="38,48 44,48 42,44" fill="#fbbf24"/>
      <polygon points="62,48 56,48 58,44" fill="#fbbf24"/>
      <circle cx="42" cy="46" r="1.5" fill="#000"/>
      <circle cx="58" cy="46" r="1.5" fill="#000"/>
      <polygon points="45,62 55,62 50,75" fill="#475569"/>
      <circle cx="50" cy="72" r="3" fill="#000"/>
    </svg>`
  },
  chick: {
    name: "கோழிக்குஞ்சு (Chick)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="55" r="24" fill="#fde047"/>
      <circle cx="50" cy="30" r="16" fill="#fde047"/>
      <circle cx="44" cy="28" r="2" fill="#000"/>
      <circle cx="56" cy="28" r="2" fill="#000"/>
      <polygon points="46,32 54,32 50,38" fill="#f97316"/>
      <path d="M42 78v8M58 78v8M38 86h8M54 86h8" stroke="#f97316" stroke-width="3" stroke-linecap="round"/>
      <path d="M26 55c-4 0-6 8 0 10s10-10 0-10zm48 0c4 0 6 8 0 10s-10-10 0-10z" fill="#facc15"/>
    </svg>`
  },
  horse: {
    name: "குதிரை (Horse)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 30l30 5-5 35-25-5z" fill="#d97706"/>
      <path d="M33 25c2 10-2 25-5 35 6-5 8-15 5-35zm5-5c2 10-2 20-5 30 6-5 8-12 5-30z" fill="#78350f"/>
      <polygon points="35,32 30,15 42,25" fill="#d97706"/>
      <polygon points="40,32 38,18 46,26" fill="#d97706"/>
      <path d="M60 35l15 15-5 10-15-5z" fill="#ffedd5"/>
      <circle cx="68" cy="50" r="2" fill="#000"/>
      <circle cx="48" cy="36" r="2.5" fill="#000"/>
    </svg>`
  },
  lamb: {
    name: "ஆட்டுக்குட்டி (Lamb)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="42" cy="55" r="16" fill="#f1f5f9"/>
      <circle cx="58" cy="55" r="16" fill="#f1f5f9"/>
      <circle cx="50" cy="45" r="16" fill="#f1f5f9"/>
      <circle cx="50" cy="65" r="16" fill="#f1f5f9"/>
      <circle cx="50" cy="35" r="12" fill="#ffedd5"/>
      <circle cx="50" cy="25" r="5" fill="#f1f5f9"/>
      <path d="M38 32c-5 0-8 6-3 8s8-8 3-8zm24 0c5 0 8 6 3 8s-8-8-3-8z" fill="#ffedd5"/>
      <circle cx="46" cy="33" r="1.5" fill="#000"/>
      <circle cx="54" cy="33" r="1.5" fill="#000"/>
      <rect x="40" y="70" width="4" height="15" fill="#cbd5e1"/>
      <rect x="56" y="70" width="4" height="15" fill="#cbd5e1"/>
    </svg>`
  },
  cow: {
    name: "பசு (Cow)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="30" fill="#fff" stroke="#e2e8f0" stroke-width="2"/>
      <ellipse cx="34" cy="42" rx="8" ry="6" fill="#000"/>
      <ellipse cx="64" cy="58" rx="10" ry="8" fill="#000"/>
      <circle cx="48" cy="32" r="5" fill="#000"/>
      <path d="M22 38c-8-2-10 6-4 8s10-6 4-8zm56 0c8-2 10 6 4 8s-10-6-4-8z" fill="#fff" stroke="#e2e8f0"/>
      <path d="M38 24c-3-6-8-8-8-8s2 6 6 8m24 0c3-6 8-8 8-8s-2 6-6 8" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="40" cy="42" r="3" fill="#000"/>
      <circle cx="60" cy="42" r="3" fill="#000"/>
      <ellipse cx="50" cy="62" rx="14" ry="9" fill="#fda4af"/>
      <circle cx="44" cy="62" r="2" fill="#475569"/>
      <circle cx="56" cy="62" r="2" fill="#475569"/>
    </svg>`
  },
  dog: {
    name: "நாய் (Dog)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="28" fill="#d97706"/>
      <path d="M24 35c-4 8-6 18 0 20s12-12 0-20zm52 0c4 8 6 18 0 20s-12-12 0-20z" fill="#78350f"/>
      <circle cx="40" cy="44" r="3" fill="#000"/>
      <circle cx="60" cy="44" r="3" fill="#000"/>
      <ellipse cx="50" cy="58" rx="9" ry="7" fill="#ffedd5"/>
      <ellipse cx="50" cy="54" rx="4" ry="2.5" fill="#000"/>
      <path d="M48 64c0 4 4 6 4 0h-4z" fill="#f43f5e"/>
    </svg>`
  },
  duck: {
    name: "வாத்து (Duck)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="45" cy="60" rx="22" ry="15" fill="#fff" stroke="#e2e8f0" stroke-width="1.5"/>
      <path d="M56 55c5-10 6-22 1-26" stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none"/>
      <circle cx="57" cy="24" r="8" fill="#fff" stroke="#e2e8f0" stroke-width="0.5"/>
      <path d="M63 24l12 3-12 3z" fill="#f97316"/>
      <circle cx="55" cy="22" r="1.5" fill="#000"/>
      <path d="M38 74l-3 8h6zm12 0l-3 8h6z" fill="#f97316"/>
    </svg>`
  },
  zebra: {
    name: "வரிக்குதிரை (Zebra)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 30l30 5-5 35-25-5z" fill="#fff" stroke="#e2e8f0" stroke-width="1"/>
      <path d="M36 34l8 2M38 42l10 3M40 50l12 3M42 58l10 3" stroke="#000" stroke-width="3" stroke-linecap="round"/>
      <path d="M33 25c2 10-2 25-5 35 6-5 8-15 5-35z" fill="#000"/>
      <polygon points="35,32 30,15 42,25" fill="#fff" stroke="#e2e8f0"/>
      <polygon points="40,32 38,18 46,26" fill="#000"/>
      <path d="M60 35l15 15-5 10-15-5z" fill="#475569"/>
      <circle cx="68" cy="50" r="1.5" fill="#000"/>
      <circle cx="48" cy="36" r="2" fill="#000"/>
    </svg>`
  },
  fox: {
    name: "நரி (Fox)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,25 20,50 32,75 68,75 80,50" fill="#ea580c"/>
      <polygon points="50,55 20,50 32,75" fill="#fff"/>
      <polygon points="50,55 80,50 68,75" fill="#fff"/>
      <polygon points="25,40 12,12 32,28" fill="#ea580c"/>
      <polygon points="75,40 88,12 68,28" fill="#ea580c"/>
      <polygon points="25,40 18,22 28,32" fill="#3f3f46"/>
      <polygon points="75,40 82,22 72,32" fill="#3f3f46"/>
      <circle cx="50" cy="70" r="4.5" fill="#000"/>
      <circle cx="36" cy="46" r="3" fill="#000"/>
      <circle cx="64" cy="46" r="3" fill="#000"/>
      <circle cx="37" cy="45" r="1" fill="#fff"/>
      <circle cx="65" cy="45" r="1" fill="#fff"/>
    </svg>`
  },
  panda: {
    name: "பாண்டா (Panda)",
    category: "animals",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="28" fill="#fff" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="30" cy="28" r="8" fill="#000"/>
      <circle cx="70" cy="28" r="8" fill="#000"/>
      <ellipse cx="40" cy="46" rx="6.5" ry="8.5" fill="#000" transform="rotate(-15 40 46)"/>
      <ellipse cx="60" cy="46" rx="6.5" ry="8.5" fill="#000" transform="rotate(15 60 46)"/>
      <circle cx="40" cy="46" r="2" fill="#fff"/>
      <circle cx="60" cy="46" r="2" fill="#fff"/>
      <ellipse cx="50" cy="58" rx="4" ry="2.5" fill="#000"/>
      <path d="M48 63s2 2 4 0" stroke="#000" stroke-width="1.5" fill="none"/>
    </svg>`
  }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadWorksheets();
  renderDashboard();
  initEventListeners();
  renderLibraryGrid();
});

// Load worksheets from local storage
function loadWorksheets() {
  const saved = localStorage.getItem("educational_worksheets");
  if (saved) {
    try {
      worksheets = JSON.parse(saved);
      // Migrate old single page worksheets structure and add default types
      worksheets.forEach(ws => {
        if (!ws.type) {
          ws.type = "circle";
        }
        if (!ws.pages) {
          ws.pages = [
            {
              id: "page-legacy-" + Date.now(),
              layout: ws.layout || 4,
              quadrants: ws.quadrants || []
            }
          ];
          delete ws.layout;
          delete ws.quadrants;
        }
        // Ensure fill-blanks pages have layouts and items set
        ws.pages.forEach(p => {
          if (ws.type === "fill-blanks") {
            if (!p.items) p.items = [];
            const layout = parseInt(p.layout) || 9;
            while (p.items.length < layout) {
              p.items.push({ type: "library", id: "deer", word: "deer", displayWord: "d _ _ r" });
            }
          } else {
            if (!p.quadrants) p.quadrants = [];
          }
        });
      });
    } catch (e) {
      console.error("Failed to parse worksheets from local storage", e);
      worksheets = [];
    }
  } else {
    // Inject default sample worksheets if empty
    worksheets = [createSampleWorksheet(), createSampleFillBlanksWorksheet()];
    saveWorksheets();
  }
}

// Save worksheets array to local storage
function saveWorksheets() {
  localStorage.setItem("educational_worksheets", JSON.stringify(worksheets));
}

// Generate a mock initial worksheet with the 4 default quadrants from the user's screenshot
function createSampleWorksheet() {
  return {
    id: "sample-worksheet-1",
    title: "கொடுக்கப்பட்ட எழுத்துடன் தொடங்கும் படத்தை வட்டமிடுக",
    subtitle: "Circle the picture that starts with the given letter.",
    type: "circle",
    pages: [
      {
        id: "page-sample-1",
        layout: 2,
        quadrants: [
          {
            centerChar: "அ",
            imageCount: 8,
            images: [
              { type: "library", id: "mother" },
              { type: "library", id: "leaf" },
              { type: "library", id: "squirrel" },
              { type: "library", id: "mouse" },
              { type: "library", id: "arrow" },
              { type: "library", id: "ball" },
              { type: "library", id: "ladder" },
              { type: "library", id: "rice" }
            ]
          },
          {
            centerChar: "ஆ",
            imageCount: 7,
            images: [
              { type: "library", id: "owl" },
              { type: "library", id: "tree" },
              { type: "library", id: "arrow" },
              { type: "library", id: "mother" },
              { type: "library", id: "turtle" },
              { type: "library", id: "goat" },
              { type: "library", id: "crane" }
            ]
          }
        ]
      },
      {
        id: "page-sample-2",
        layout: 2,
        quadrants: [
          {
            centerChar: "இ",
            imageCount: 8,
            images: [
              { type: "library", id: "idli" },
              { type: "library", id: "squirrel" },
              { type: "library", id: "leaf" },
              { type: "library", id: "mouse" },
              { type: "library", id: "ginger" },
              { type: "library", id: "crane" },
              { type: "library", id: "mother" },
              { type: "library", id: "ladder" }
            ]
          },
          {
            centerChar: "ஈ",
            imageCount: 8,
            images: [
              { type: "library", id: "mother" },
              { type: "library", id: "leaf" },
              { type: "library", id: "fly" },
              { type: "library", id: "termite" },
              { type: "library", id: "rice" },
              { type: "library", id: "crane" },
              { type: "library", id: "ball" },
              { type: "library", id: "arrow" }
            ]
          }
        ]
      }
    ],
    createdAt: new Date().toISOString()
  };
}

// Generate a mock initial worksheet for fill-in-the-blanks containing the 15 animal slots from screenshot
function createSampleFillBlanksWorksheet() {
  return {
    id: "sample-fill-blanks-1",
    title: "Animals - Fill in the missing vowels",
    subtitle: "Fill in the missing vowels for each of the following words:",
    type: "fill-blanks",
    pages: [
      {
        id: "page-fb-sample-1",
        layout: 15,
        items: [
          { type: "library", id: "deer", word: "deer", displayWord: "d _ _ r" },
          { type: "library", id: "tiger", word: "tiger", displayWord: "t _ g _ r" },
          { type: "library", id: "lion", word: "lion", displayWord: "l _ _ n" },
          { type: "library", id: "bear", word: "bear", displayWord: "b _ _ r" },
          { type: "library", id: "cheetah", word: "cheetah", displayWord: "ch _ _ t _ h" },
          { type: "library", id: "wolf", word: "wolf", displayWord: "w _ l f" },
          { type: "library", id: "chick", word: "chick", displayWord: "ch _ c k" },
          { type: "library", id: "horse", word: "horse", displayWord: "h _ r s _" },
          { type: "library", id: "lamb", word: "lamb", displayWord: "l _ m b" },
          { type: "library", id: "cow", word: "cow", displayWord: "c _ w" },
          { type: "library", id: "dog", word: "dog", displayWord: "d _ g" },
          { type: "library", id: "duck", word: "duck", displayWord: "d _ c k" },
          { type: "library", id: "zebra", word: "zebra", displayWord: "z _ b r _" },
          { type: "library", id: "fox", word: "fox", displayWord: "f _ x" },
          { type: "library", id: "panda", word: "panda", displayWord: "p _ n d _" }
        ]
      }
    ],
    createdAt: new Date().toISOString()
  };
}

// Render Dashboard View
function renderDashboard() {
  const grid = document.getElementById("worksheets-grid");
  grid.innerHTML = "";

  // Render the "+ Create Circle" card
  const newCircleCard = document.createElement("div");
  newCircleCard.className = "worksheet-card empty-state";
  newCircleCard.style.cursor = "pointer";
  newCircleCard.style.padding = "2rem";
  newCircleCard.style.height = "100%";
  newCircleCard.style.minHeight = "280px";
  newCircleCard.innerHTML = `
    <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
    <h4 style="margin-top: 1rem;">Circle Worksheet</h4>
    <p style="font-size: 0.875rem;">Design matching worksheets where kids circle images starting with specific letters (வட்டமிடுக).</p>
  `;
  newCircleCard.addEventListener("click", () => handleCreateNew("circle"));
  grid.appendChild(newCircleCard);

  // Render the "+ Create Fill Blanks" card
  const newFBCard = document.createElement("div");
  newFBCard.className = "worksheet-card empty-state";
  newFBCard.style.cursor = "pointer";
  newFBCard.style.padding = "2rem";
  newFBCard.style.height = "100%";
  newFBCard.style.minHeight = "280px";
  newFBCard.innerHTML = `
    <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
    <h4 style="margin-top: 1rem;">Fill-in-the-Blanks</h4>
    <p style="font-size: 0.875rem;">Design vocabulary worksheets where kids fill in missing letters or vowels (நிரப்புக).</p>
  `;
  newFBCard.addEventListener("click", () => handleCreateNew("fill-blanks"));
  grid.appendChild(newFBCard);

  // Render saved worksheets
  worksheets.forEach(ws => {
    const card = document.createElement("div");
    card.className = "worksheet-card";
    
    // Thumbnail preview using first page
    let previewHTML = "";
    const firstPage = ws.pages[0];
    
    if (ws.type === "fill-blanks") {
      const items = firstPage ? firstPage.items : [];
      previewHTML = `
        <div class="card-preview-quad" style="font-size:0.7rem; padding: 2px;">${items[0] ? items[0].displayWord : "d _ _ r"}</div>
        <div class="card-preview-quad" style="font-size:0.7rem; padding: 2px;">${items[1] ? items[1].displayWord : "t _ g _ r"}</div>
        <div class="card-preview-quad" style="font-size:0.7rem; padding: 2px;">${items[2] ? items[2].displayWord : "l _ _ n"}</div>
        <div class="card-preview-quad" style="font-size:0.7rem; padding: 2px;">${items[3] ? items[3].displayWord : "b _ _ r"}</div>
      `;
    } else {
      const quadCount = firstPage ? parseInt(firstPage.layout) : 1;
      if (quadCount === 1) {
        previewHTML = `<div class="card-preview-quad" style="grid-column: 1 / -1; grid-row: 1 / -1;">
          ${firstPage?.quadrants[0]?.centerChar || "?"}
          <div class="card-preview-quad-dot" style="top:20%; left:20%;"></div>
          <div class="card-preview-quad-dot" style="top:20%; right:20%;"></div>
          <div class="card-preview-quad-dot" style="bottom:20%; left:20%;"></div>
          <div class="card-preview-quad-dot" style="bottom:20%; right:20%;"></div>
        </div>`;
      } else if (quadCount === 2) {
        previewHTML = `
          <div class="card-preview-quad" style="grid-column: 1 / -1;">${firstPage?.quadrants[0]?.centerChar || "?"}</div>
          <div class="card-preview-quad" style="grid-column: 1 / -1;">${firstPage?.quadrants[1]?.centerChar || "?"}</div>
        `;
      } else {
        previewHTML = `
          <div class="card-preview-quad">${firstPage?.quadrants[0]?.centerChar || "?"}</div>
          <div class="card-preview-quad">${firstPage?.quadrants[1]?.centerChar || "?"}</div>
          <div class="card-preview-quad">${firstPage?.quadrants[2]?.centerChar || "?"}</div>
          <div class="card-preview-quad">${firstPage?.quadrants[3]?.centerChar || "?"}</div>
        `;
      }
    }

    const typeLabel = ws.type === "fill-blanks" ? "Fill-in-the-Blanks" : "Circle Worksheet";

    card.innerHTML = `
      <div class="worksheet-card-preview">
        ${previewHTML}
      </div>
      <div class="worksheet-card-body">
        <div>
          <h4 class="worksheet-card-title">${ws.title || "Untitled Workbook"}</h4>
          <p class="worksheet-card-meta"><strong>${typeLabel}</strong><br>Pages: ${ws.pages.length} | Created: ${new Date(ws.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="worksheet-card-actions" style="margin-top: 0.5rem;">
          <button class="btn btn-primary btn-edit-ws" data-id="${ws.id}">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15H9v-3L18.5 2.5z"></path></svg>
            Edit
          </button>
          <button class="btn btn-danger btn-delete-ws" data-id="${ws.id}">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22"></path></svg>
            Delete
          </button>
        </div>
      </div>
    `;

    // Event listeners for card actions
    card.querySelector(".btn-edit-ws").addEventListener("click", (e) => {
      e.stopPropagation();
      openEditor(ws.id);
    });
    card.querySelector(".btn-delete-ws").addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("Are you sure you want to delete this workbook?")) {
        deleteWorksheet(ws.id);
      }
    });

    grid.appendChild(card);
  });
}

// Save worksheet and go to editor
function handleCreateNew(type = "circle") {
  let newWS;
  if (type === "fill-blanks") {
    newWS = {
      id: "ws-" + Date.now(),
      title: "Animals - Fill in the missing vowels",
      subtitle: "Fill in the missing vowels for each of the following words:",
      type: "fill-blanks",
      pages: [
        {
          id: "page-" + Date.now(),
          layout: 15, // default 15 items grid
          items: [
            { type: "library", id: "deer", word: "deer", displayWord: "d _ _ r" },
            { type: "library", id: "tiger", word: "tiger", displayWord: "t _ g _ r" },
            { type: "library", id: "lion", word: "lion", displayWord: "l _ _ n" },
            { type: "library", id: "bear", word: "bear", displayWord: "b _ _ r" },
            { type: "library", id: "cheetah", word: "cheetah", displayWord: "ch _ _ t _ h" },
            { type: "library", id: "wolf", word: "wolf", displayWord: "w _ l f" },
            { type: "library", id: "chick", word: "chick", displayWord: "ch _ c k" },
            { type: "library", id: "horse", word: "horse", displayWord: "h _ r s _" },
            { type: "library", id: "lamb", word: "lamb", displayWord: "l _ m b" },
            { type: "library", id: "cow", word: "cow", displayWord: "c _ w" },
            { type: "library", id: "dog", word: "dog", displayWord: "d _ g" },
            { type: "library", id: "duck", word: "duck", displayWord: "d _ c k" },
            { type: "library", id: "zebra", word: "zebra", displayWord: "z _ b r _" },
            { type: "library", id: "fox", word: "fox", displayWord: "f _ x" },
            { type: "library", id: "panda", word: "panda", displayWord: "p _ n d _" }
          ]
        }
      ],
      createdAt: new Date().toISOString()
    };
  } else {
    newWS = {
      id: "ws-" + Date.now(),
      title: "கொடுக்கப்பட்ட எழுத்துடன் தொடங்கும் படத்தை வட்டமிடுக",
      subtitle: "Circle the picture that starts with the given letter.",
      type: "circle",
      pages: [
        {
          id: "page-" + Date.now(),
          layout: 4,
          quadrants: [
            { centerChar: "அ", imageCount: 6, images: [] },
            { centerChar: "ஆ", imageCount: 6, images: [] },
            { centerChar: "இ", imageCount: 6, images: [] },
            { centerChar: "ஈ", imageCount: 6, images: [] }
          ]
        }
      ],
      createdAt: new Date().toISOString()
    };
  }
  worksheets.unshift(newWS);
  saveWorksheets();
  renderDashboard();
  openEditor(newWS.id);
}

// Duplicate a worksheet
function duplicateWorksheet(id) {
  const target = worksheets.find(w => w.id === id);
  if (!target) return;

  const clone = JSON.parse(JSON.stringify(target));
  clone.id = "ws-" + Date.now();
  clone.title = clone.title + " (Copy)";
  clone.createdAt = new Date().toISOString();

  worksheets.unshift(clone);
  saveWorksheets();
  renderDashboard();
}

// Delete a worksheet
function deleteWorksheet(id) {
  worksheets = worksheets.filter(w => w.id !== id);
  saveWorksheets();
  renderDashboard();
}

// Switch between dashboard and editor views
function setView(viewName) {
  const dashboard = document.getElementById("dashboard-view");
  const editor = document.getElementById("editor-view");
  const navbarActions = document.getElementById("navbar-actions");

  if (viewName === "dashboard") {
    dashboard.style.display = "block";
    editor.classList.remove("active");
    document.body.classList.remove("editor-mode");
    navbarActions.innerHTML = "";
  } else if (viewName === "editor") {
    dashboard.style.display = "none";
    editor.classList.add("active");
    document.body.classList.add("editor-mode");
    
    // Inject editor specific navbar actions
    navbarActions.innerHTML = `
      <button class="btn btn-secondary" id="btn-back-dashboard">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Dashboard
      </button>
      <button class="btn btn-accent" id="btn-pdf-export">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        Export PDF
      </button>
    `;

    document.getElementById("btn-back-dashboard").addEventListener("click", () => {
      saveWorksheets();
      setView("dashboard");
      renderDashboard();
    });

    document.getElementById("btn-pdf-export").addEventListener("click", exportToPDF);
  }
}

// Open editor for a specific worksheet
function openEditor(id) {
  const ws = worksheets.find(w => w.id === id);
  if (!ws) return;

  currentWorksheet = ws;
  activePageIndex = 0;
  activeQuadrantIndex = 0;
  activeSlotIndex = null;
  activeItemIndex = 0;
  
  setView("editor");
  loadActivePageData();
  renderEditorWorkspace();
}

// Load active page config into sidebar controls
function loadActivePageData() {
  if (!currentWorksheet) return;

  document.getElementById("input-worksheet-title").value = currentWorksheet.title || "";
  document.getElementById("input-worksheet-subtitle").value = currentWorksheet.subtitle || "";
  
  const activePage = currentWorksheet.pages[activePageIndex];
  if (!activePage) return;

  // Toggle layout panels and config panels in sidebar based on worksheet type
  const groupCircle = document.getElementById("group-layout-circle");
  const groupFB = document.getElementById("group-layout-fb");
  const panelCircle = document.getElementById("config-panel-circle");
  const panelFB = document.getElementById("config-panel-fb");

  if (currentWorksheet.type === "fill-blanks") {
    groupCircle.style.display = "none";
    groupFB.style.display = "block";
    panelCircle.style.display = "none";
    panelFB.style.display = "block";

    // Set layout picker active state for Fill-in-the-blanks
    const layoutPickers = document.querySelectorAll("#layout-picker-fb .layout-option");
    layoutPickers.forEach(opt => {
      opt.classList.remove("active");
      if (parseInt(opt.getAttribute("data-layout")) === parseInt(activePage.layout)) {
        opt.classList.add("active");
      }
    });

    loadActiveFBItemConfig();
  } else {
    groupCircle.style.display = "block";
    groupFB.style.display = "none";
    panelCircle.style.display = "block";
    panelFB.style.display = "none";

    // Set layout picker active state for Circle
    const layoutPickers = document.querySelectorAll("#layout-picker-circle .layout-option");
    layoutPickers.forEach(opt => {
      opt.classList.remove("active");
      if (parseInt(opt.getAttribute("data-layout")) === parseInt(activePage.layout)) {
        opt.classList.add("active");
      }
    });

    updateQuadrantTabs();
    loadActiveQuadrantConfig();
  }

  renderSidebarPageList();
}

// Load configs for active fill-in-the-blanks item in sidebar
function loadActiveFBItemConfig() {
  const activePage = currentWorksheet.pages[activePageIndex];
  if (!activePage) return;

  const layout = parseInt(activePage.layout) || 9;
  
  // Safe check if active index is out of bounds
  if (activeItemIndex >= layout) {
    activeItemIndex = 0;
  }

  // Render the items selector buttons (1 to N)
  const itemSelector = document.getElementById("fb-item-selector");
  itemSelector.innerHTML = "";
  for (let i = 0; i < layout; i++) {
    const btn = document.createElement("button");
    btn.className = "item-selector-btn";
    if (activeItemIndex === i) {
      btn.classList.add("active");
    }
    btn.textContent = i + 1;
    btn.addEventListener("click", () => {
      activeItemIndex = i;
      document.querySelectorAll(".item-selector-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      loadActiveFBItemConfig();
      renderEditorWorkspace();
    });
    itemSelector.appendChild(btn);
  }

  const item = activePage.items[activeItemIndex];
  if (!item) return;

  // Render the active item's slot thumbnail
  const activeSlot = document.getElementById("fb-active-slot");
  activeSlot.innerHTML = "";
  
  const thumb = document.createElement("div");
  thumb.className = "slot-thumbnail";
  if (item.type === "library") {
    const libItem = ILLUSTRATION_LIBRARY[item.id];
    if (libItem) {
      thumb.innerHTML = libItem.svg;
    } else {
      thumb.innerHTML = `<span style="font-size:1.5rem">?</span>`;
    }
  } else if (item.type === "upload") {
    thumb.innerHTML = `<img src="${item.data}" alt="uploaded image">`;
  } else {
    thumb.innerHTML = `<svg width="20" height="20" fill="none" stroke="#94a3b8" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>`;
  }

  // Open modal selection when slot is clicked
  thumb.addEventListener("click", () => {
    openFBImageModal();
  });

  activeSlot.appendChild(thumb);

  // Set input fields values
  document.getElementById("input-fb-word").value = item.word || "";
  document.getElementById("input-fb-display").value = item.displayWord || "";
}

function openFBImageModal() {
  const modal = document.getElementById("image-modal");
  const modalTitle = document.getElementById("modal-title");
  
  modalTitle.textContent = `Select Image: Page ${activePageIndex + 1}, Item ${activeItemIndex + 1}`;
  modal.classList.add("active");
  modal.setAttribute("data-target-type", "fb");
}

// Load configs for active quadrant tab in sidebar
function loadActiveQuadrantConfig() {
  const activePage = currentWorksheet.pages[activePageIndex];
  if (!activePage) return;

  const quad = activePage.quadrants[activeQuadrantIndex];
  if (!quad) return;

  document.getElementById("input-center-char").value = quad.centerChar || "";
  document.getElementById("input-image-count").value = quad.imageCount || 6;
  document.getElementById("label-image-count").textContent = quad.imageCount || 6;

  renderSidebarSlots();
}

// Render the grid of small slot thumbnails in the sidebar
function renderSidebarSlots() {
  const activePage = currentWorksheet.pages[activePageIndex];
  if (!activePage) return;

  const quad = activePage.quadrants[activeQuadrantIndex];
  const grid = document.getElementById("slots-grid");
  grid.innerHTML = "";

  if (!quad) return;

  for (let i = 0; i < quad.imageCount; i++) {
    const slotData = quad.images[i];
    const thumb = document.createElement("div");
    thumb.className = "slot-thumbnail";
    if (activeSlotIndex === i) {
      thumb.classList.add("active");
    }

    if (slotData) {
      if (slotData.type === "library") {
        const libItem = ILLUSTRATION_LIBRARY[slotData.id];
        if (libItem) {
          thumb.innerHTML = libItem.svg;
        } else {
          thumb.innerHTML = `<span style="font-size:1.5rem">?</span>`;
        }
      } else if (slotData.type === "upload") {
        thumb.innerHTML = `<img src="${slotData.data}" alt="uploaded image">`;
      }
    } else {
      thumb.innerHTML = `<svg width="20" height="20" fill="none" stroke="#94a3b8" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>`;
    }

    // Add slot index marker
    const marker = document.createElement("span");
    marker.className = "slot-thumbnail-num";
    marker.textContent = i + 1;
    thumb.appendChild(marker);

    thumb.addEventListener("click", () => {
      activeSlotIndex = i;
      document.querySelectorAll(".slot-thumbnail").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      
      highlightWorkspaceSlot(i);
      openImageModal();
    });

    grid.appendChild(thumb);
  }
}

// Highlight the active slot inside the workspace preview page
function highlightWorkspaceSlot(index) {
  document.querySelectorAll(".circle-slot-item").forEach(slot => {
    slot.classList.remove("active");
    if (parseInt(slot.getAttribute("data-page-idx")) === activePageIndex &&
        parseInt(slot.getAttribute("data-quadrant-idx")) === activeQuadrantIndex && 
        parseInt(slot.getAttribute("data-slot-idx")) === index) {
      slot.classList.add("active");
    }
  });
}

// Update which quadrant tabs are enabled based on active page layout
function updateQuadrantTabs() {
  const activePage = currentWorksheet.pages[activePageIndex];
  if (!activePage) return;

  const layout = parseInt(activePage.layout);
  const tabs = document.querySelectorAll("#quadrant-tabs .quadrant-tab");
  
  tabs.forEach((tab, index) => {
    if (index < layout) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });

  // Safe check if active tab is hidden, switch to tab A (index 0)
  if (activeQuadrantIndex >= layout) {
    activeQuadrantIndex = 0;
    tabs.forEach(t => t.classList.remove("active"));
    tabs[0].classList.add("active");
  }
}

// Render the live stacked pages inside editor workspace preview
function renderEditorWorkspace() {
  if (!currentWorksheet) return;

  const container = document.getElementById("worksheet-pages-container");
  container.innerHTML = "";

  const totalPages = currentWorksheet.pages.length;

  currentWorksheet.pages.forEach((pageData, pIdx) => {
    const pageEl = document.createElement("div");
    pageEl.className = "worksheet-a4-page";
    pageEl.setAttribute("data-page-index", pIdx);
    
    // Add visual outline helper for currently selected active page
    if (pIdx === activePageIndex) {
      pageEl.style.outline = "2px solid #6366f1";
      pageEl.style.outlineOffset = "4px";
    }

    // Worksheet Header
    const headerEl = document.createElement("div");
    headerEl.className = "worksheet-header";
    headerEl.innerHTML = `
      <h1>${currentWorksheet.title || ""}</h1>
      <p>${currentWorksheet.subtitle || ""}</p>
    `;
    pageEl.appendChild(headerEl);

    // Preview Grid
    const gridEl = document.createElement("div");
    gridEl.className = "worksheet-preview-grid";
    gridEl.setAttribute("data-layout", pageData.layout);

    if (currentWorksheet.type === "fill-blanks") {
      const itemCount = parseInt(pageData.layout) || 9;
      const cols = (itemCount === 6) ? 2 : 3;
      const rows = Math.ceil(itemCount / cols);
      gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      gridEl.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      gridEl.classList.add("fill-blanks-grid");
      gridEl.classList.add(cols === 2 ? "fb-cols-2" : "fb-cols-3");

      for (let i = 0; i < itemCount; i++) {
        const itemData = pageData.items[i] || { type: "", id: "", word: "", displayWord: "" };
        const cellEl = document.createElement("div");
        cellEl.className = "worksheet-fb-cell";
        cellEl.setAttribute("data-item-idx", i);

        if (pIdx === activePageIndex && i === activeItemIndex) {
          cellEl.classList.add("active-cell");
        }

        // Image container
        const imgContainer = document.createElement("div");
        imgContainer.className = "worksheet-fb-cell-img";

        if (itemData.type === "library") {
          const libItem = ILLUSTRATION_LIBRARY[itemData.id];
          if (libItem) {
            imgContainer.innerHTML = libItem.svg;
          } else {
            imgContainer.innerHTML = `<span style="font-size:1.5rem">?</span>`;
          }
        } else if (itemData.type === "upload") {
          imgContainer.innerHTML = `<img src="${itemData.data}" alt="uploaded image">`;
        } else {
          imgContainer.innerHTML = `
            <div class="circle-slot-placeholder">
              <span class="circle-slot-placeholder-icon">?</span>
            </div>
          `;
        }
        cellEl.appendChild(imgContainer);

        // Word container
        const wordContainer = document.createElement("div");
        wordContainer.className = "worksheet-fb-cell-word";
        wordContainer.textContent = itemData.displayWord || "______";
        
        // Dynamically scale down font size for long words to keep it in one line
        const textLen = (itemData.displayWord || "").length;
        if (textLen > 14) {
          wordContainer.style.fontSize = "12px";
          wordContainer.style.letterSpacing = "0.5px";
        } else if (textLen > 10) {
          wordContainer.style.fontSize = "14px";
          wordContainer.style.letterSpacing = "1px";
        } else if (textLen > 7) {
          wordContainer.style.fontSize = "17px";
          wordContainer.style.letterSpacing = "1.5px";
        }
        
        cellEl.appendChild(wordContainer);

        // Click to focus item
        cellEl.addEventListener("click", (e) => {
          e.stopPropagation();
          let reloadRequired = false;
          if (activePageIndex !== pIdx) {
            activePageIndex = pIdx;
            reloadRequired = true;
          }
          activeItemIndex = i;
          
          if (reloadRequired) {
            loadActivePageData();
          } else {
            loadActiveFBItemConfig();
          }
          renderEditorWorkspace();
        });

        gridEl.appendChild(cellEl);
      }
    } else {
      const quadCount = parseInt(pageData.layout);

      for (let q = 0; q < quadCount; q++) {
        const quadData = pageData.quadrants[q];
        if (!quadData) continue;

        const quadrantEl = document.createElement("div");
        quadrantEl.className = "worksheet-quadrant";
        quadrantEl.setAttribute("data-quad-idx", q);

        // Highlight active editing quadrant border slightly
        if (pIdx === activePageIndex && q === activeQuadrantIndex) {
          quadrantEl.style.borderColor = "#6366f1";
          quadrantEl.style.borderWidth = "2px";
        }

        // Render center character
        const centerCharEl = document.createElement("div");
        centerCharEl.className = "quadrant-center-char";
        centerCharEl.textContent = quadData.centerChar || "?";
        quadrantEl.appendChild(centerCharEl);

        // Draw circular container wrapper
        const circleContainer = document.createElement("div");
        circleContainer.className = "circular-items-container";

        // Draw surrounding images
        const count = parseInt(quadData.imageCount) || 6;
        const angleStep = (2 * Math.PI) / count;
        const startAngle = -Math.PI / 2; // Start from 12 o'clock

        for (let i = 0; i < count; i++) {
          const angle = startAngle + i * angleStep;
          const radius = 38;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);

          const slotItem = document.createElement("div");
          slotItem.className = "circle-slot-item";
          slotItem.setAttribute("data-page-idx", pIdx);
          slotItem.setAttribute("data-quadrant-idx", q);
          slotItem.setAttribute("data-slot-idx", i);
          slotItem.style.setProperty("--x", `${x}%`);
          slotItem.style.setProperty("--y", `${y}%`);

          // If active slot, show it highlighted
          if (pIdx === activePageIndex && q === activeQuadrantIndex && i === activeSlotIndex) {
            slotItem.classList.add("active");
          }

          // Check if image exists in slot
          const imgData = quadData.images[i];
          if (imgData) {
            if (imgData.type === "library") {
              const libItem = ILLUSTRATION_LIBRARY[imgData.id];
              if (libItem) {
                slotItem.innerHTML = libItem.svg;
              } else {
                slotItem.innerHTML = `<span style="font-size:1.5rem">?</span>`;
              }
            } else if (imgData.type === "upload") {
              slotItem.innerHTML = `<img src="${imgData.data}" alt="loaded file">`;
            }
          } else {
            slotItem.innerHTML = `
              <div class="circle-slot-placeholder">
                <span class="circle-slot-placeholder-icon">?</span>
              </div>
            `;
          }

          // Event listener to select slot
          slotItem.addEventListener("click", (e) => {
            e.stopPropagation();
            let reloadRequired = false;
            if (activePageIndex !== pIdx || activeQuadrantIndex !== q) {
              activePageIndex = pIdx;
              activeQuadrantIndex = q;
              reloadRequired = true;
            }
            activeSlotIndex = i;

            if (reloadRequired) {
              loadActivePageData();
              renderEditorWorkspace();
            } else {
              renderSidebarSlots();
            }
            
            highlightWorkspaceSlot(i);
            openImageModal();
          });

          circleContainer.appendChild(slotItem);
        }

        quadrantEl.appendChild(circleContainer);
        
        // Focus quadrant on sidebar when quadrant box is clicked
        quadrantEl.addEventListener("click", () => {
          if (activePageIndex !== pIdx || activeQuadrantIndex !== q) {
            activePageIndex = pIdx;
            activeQuadrantIndex = q;
            activeSlotIndex = null;
            loadActivePageData();
            renderEditorWorkspace();
          }
        });

        gridEl.appendChild(quadrantEl);
      }
    }
    pageEl.appendChild(gridEl);

    // Worksheet Footer
    const footerEl = document.createElement("div");
    footerEl.className = "worksheet-footer";
    footerEl.innerHTML = `<span>Generated using கல்வி Worksheet Builder &copy; 2026 - www.tryworksheets.com</span>`;
    pageEl.appendChild(footerEl);

    // Page Number
    const pgNum = document.createElement("div");
    pgNum.className = "worksheet-page-number";
    pgNum.textContent = `Page ${pIdx + 1} of ${totalPages}`;
    pageEl.appendChild(pgNum);

    container.appendChild(pageEl);
  });

  // Append Dashed "+ Add Page" card at bottom
  const addPagePlaceholder = document.createElement("div");
  addPagePlaceholder.className = "add-page-placeholder";
  addPagePlaceholder.innerHTML = `
    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
    <span>Add New Page (புதிய பக்கம் சேர்க்கவும்)</span>
  `;
  addPagePlaceholder.addEventListener("click", addNewPage);
  container.appendChild(addPagePlaceholder);
}

// Open modal selection
function openImageModal() {
  const modal = document.getElementById("image-modal");
  const modalTitle = document.getElementById("modal-title");
  
  modalTitle.textContent = `Select Image: Page ${activePageIndex + 1}, Quad ${String.fromCharCode(65 + activeQuadrantIndex)}, Slot ${activeSlotIndex + 1}`;
  modal.classList.add("active");
}

// Close modal selection
function closeModal() {
  const modal = document.getElementById("image-modal");
  modal.classList.remove("active");
  
  // Clear file upload input
  document.getElementById("file-uploader").value = "";
}

// Render built-in library inside modal dialog
function renderLibraryGrid() {
  const grid = document.getElementById("library-grid");
  grid.innerHTML = "";

  Object.keys(ILLUSTRATION_LIBRARY).forEach(key => {
    const item = ILLUSTRATION_LIBRARY[key];
    const el = document.createElement("div");
    el.className = "library-item";
    el.innerHTML = `
      ${item.svg}
      <span>${item.name}</span>
    `;

    el.addEventListener("click", () => {
      selectLibraryImage(key);
    });

    grid.appendChild(el);
  });
}

// Handle choosing built-in illustration
function selectLibraryImage(id) {
  if (!currentWorksheet) return;

  const activePage = currentWorksheet.pages[activePageIndex];
  if (!activePage) return;

  const modal = document.getElementById("image-modal");
  const isFB = modal.getAttribute("data-target-type") === "fb";

  if (isFB) {
    const item = activePage.items[activeItemIndex];
    if (item) {
      item.type = "library";
      item.id = id;
    }
    saveWorksheets();
    loadActiveFBItemConfig();
    renderEditorWorkspace();
    closeModal();
  } else {
    const quad = activePage.quadrants[activeQuadrantIndex];
    if (!quad) return;

    // Set slot image
    quad.images[activeSlotIndex] = {
      type: "library",
      id: id
    };

    saveWorksheets();
    renderSidebarSlots();
    renderEditorWorkspace();
    closeModal();
  }
}

// Handle custom image uploading
function handleCustomImageUpload(file) {
  if (!file) return;

  // Validate file type
  if (!file.type.match("image.*")) {
    alert("Please upload a valid image file.");
    return;
  }

  // Validate size (max 1.5MB to prevent huge LocalStorage footprints)
  if (file.size > 1.5 * 1024 * 1024) {
    alert("File is too large. Please upload an image smaller than 1.5MB to save space.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64Data = e.target.result;

    if (!currentWorksheet) return;
    
    const activePage = currentWorksheet.pages[activePageIndex];
    if (!activePage) return;

    const modal = document.getElementById("image-modal");
    const isFB = modal.getAttribute("data-target-type") === "fb";

    if (isFB) {
      const item = activePage.items[activeItemIndex];
      if (item) {
        item.type = "upload";
        item.data = base64Data;
      }
      saveWorksheets();
      loadActiveFBItemConfig();
      renderEditorWorkspace();
      closeModal();
    } else {
      const quad = activePage.quadrants[activeQuadrantIndex];
      if (!quad) return;

      quad.images[activeSlotIndex] = {
        type: "upload",
        data: base64Data
      };

      saveWorksheets();
      renderSidebarSlots();
      renderEditorWorkspace();
      closeModal();
    }
  };
  reader.readAsDataURL(file);
}

// Sidebar Pages List Renderer
function renderSidebarPageList() {
  const list = document.getElementById("sidebar-page-list");
  list.innerHTML = "";

  if (!currentWorksheet) return;

  currentWorksheet.pages.forEach((page, index) => {
    const item = document.createElement("div");
    item.className = "page-list-item";
    if (activePageIndex === index) {
      item.classList.add("active");
    }

    const suffix = currentWorksheet.type === "fill-blanks" ? "Items" : "Quads";

    item.innerHTML = `
      <div class="page-list-item-title">
        <span class="page-list-item-badge">${index + 1}</span>
        <span>Page ${index + 1} (${page.layout} ${suffix})</span>
      </div>
      <div class="page-list-item-actions">
        <button class="page-action-btn move-up-btn" title="Move Up" ${index === 0 ? "disabled style='opacity:0.3; cursor:default;'" : ""}>
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7"></path></svg>
        </button>
        <button class="page-action-btn move-down-btn" title="Move Down" ${index === currentWorksheet.pages.length - 1 ? "disabled style='opacity:0.3; cursor:default;'" : ""}>
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <button class="page-action-btn delete-page-btn" title="Delete Page" ${currentWorksheet.pages.length <= 1 ? "disabled style='opacity:0.3; cursor:default;'" : ""}>
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1h4v3M4 7h16"></path></svg>
        </button>
      </div>
    `;

    // Click to switch page
    item.addEventListener("click", () => {
      if (activePageIndex !== index) {
        activePageIndex = index;
        activeQuadrantIndex = 0;
        activeSlotIndex = null;
        activeItemIndex = 0;
        loadActivePageData();
        renderEditorWorkspace();
      }
    });

    // Up arrow click
    item.querySelector(".move-up-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      movePage(index, -1);
    });

    // Down arrow click
    item.querySelector(".move-down-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      movePage(index, 1);
    });

    // Delete click
    item.querySelector(".delete-page-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm(`Are you sure you want to delete Page ${index + 1}?`)) {
        deletePage(index);
      }
    });

    list.appendChild(item);
  });
}

// Add new page
function addNewPage() {
  if (!currentWorksheet) return;
  let newPage;
  if (currentWorksheet.type === "fill-blanks") {
    newPage = {
      id: "page-" + Date.now(),
      layout: 9,
      items: Array(9).fill(null).map(() => ({ type: "library", id: "deer", word: "deer", displayWord: "d _ _ r" }))
    };
  } else {
    newPage = {
      id: "page-" + Date.now(),
      layout: 4,
      quadrants: [
        { centerChar: "", imageCount: 6, images: [] },
        { centerChar: "", imageCount: 6, images: [] },
        { centerChar: "", imageCount: 6, images: [] },
        { centerChar: "", imageCount: 6, images: [] }
      ]
    };
  }
  currentWorksheet.pages.push(newPage);
  activePageIndex = currentWorksheet.pages.length - 1;
  activeQuadrantIndex = 0;
  activeSlotIndex = null;
  activeItemIndex = 0;

  saveWorksheets();
  loadActivePageData();
  renderEditorWorkspace();
  
  // Auto scroll to the newly added page
  setTimeout(() => {
    const pages = document.querySelectorAll(".worksheet-a4-page");
    if (pages.length > 0) {
      pages[pages.length - 1].scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
}

// Delete page
function deletePage(index) {
  if (!currentWorksheet) return;
  if (currentWorksheet.pages.length <= 1) {
    alert("A workbook must have at least one page.");
    return;
  }

  currentWorksheet.pages.splice(index, 1);
  // Reset active index if out of bounds
  if (activePageIndex >= currentWorksheet.pages.length) {
    activePageIndex = currentWorksheet.pages.length - 1;
  }
  activeQuadrantIndex = 0;
  activeSlotIndex = null;

  saveWorksheets();
  loadActivePageData();
  renderEditorWorkspace();
}

// Move page
function movePage(index, direction) {
  if (!currentWorksheet) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= currentWorksheet.pages.length) return;

  // Swap
  const temp = currentWorksheet.pages[index];
  currentWorksheet.pages[index] = currentWorksheet.pages[targetIndex];
  currentWorksheet.pages[targetIndex] = temp;

  // Update active page index if it was moved
  if (activePageIndex === index) {
    activePageIndex = targetIndex;
  } else if (activePageIndex === targetIndex) {
    activePageIndex = index;
  }

  saveWorksheets();
  loadActivePageData();
  renderEditorWorkspace();
}

// Initialize Page Event Listeners
function initEventListeners() {
  // New Worksheet Buttons
  document.getElementById("btn-new-circle-ws").addEventListener("click", () => handleCreateNew("circle"));
  document.getElementById("btn-new-fb-ws").addEventListener("click", () => handleCreateNew("fill-blanks"));
  
  // Sidebar pages manager button
  document.getElementById("btn-add-page-sidebar").addEventListener("click", addNewPage);

  // General settings edits
  document.getElementById("input-worksheet-title").addEventListener("input", (e) => {
    if (currentWorksheet) {
      currentWorksheet.title = e.target.value;
      document.querySelectorAll(".worksheet-header h1").forEach(h1 => h1.textContent = e.target.value);
      saveWorksheets();
    }
  });

  document.getElementById("input-worksheet-subtitle").addEventListener("input", (e) => {
    if (currentWorksheet) {
      currentWorksheet.subtitle = e.target.value;
      document.querySelectorAll(".worksheet-header p").forEach(p => p.textContent = e.target.value);
      saveWorksheets();
    }
  });

  // Layout selection clicks - Circle
  const layoutOptionsCircle = document.querySelectorAll("#layout-picker-circle .layout-option");
  layoutOptionsCircle.forEach(opt => {
    opt.addEventListener("click", () => {
      layoutOptionsCircle.forEach(o => o.classList.remove("active"));
      opt.classList.add("active");

      const val = parseInt(opt.getAttribute("data-layout"));
      if (currentWorksheet) {
        const activePage = currentWorksheet.pages[activePageIndex];
        if (activePage) {
          activePage.layout = val;
          // Make sure quadrants exist up to layout size
          while (activePage.quadrants.length < val) {
            activePage.quadrants.push({ centerChar: "", imageCount: 6, images: [] });
          }
          updateQuadrantTabs();
          loadActiveQuadrantConfig();
          saveWorksheets();
          renderEditorWorkspace();
        }
      }
    });
  });

  // Layout selection clicks - Fill-in-the-Blanks
  const layoutOptionsFB = document.querySelectorAll("#layout-picker-fb .layout-option");
  layoutOptionsFB.forEach(opt => {
    opt.addEventListener("click", () => {
      layoutOptionsFB.forEach(o => o.classList.remove("active"));
      opt.classList.add("active");

      const val = parseInt(opt.getAttribute("data-layout"));
      if (currentWorksheet) {
        const activePage = currentWorksheet.pages[activePageIndex];
        if (activePage) {
          activePage.layout = val;
          // Extend or trim items array
          if (!activePage.items) activePage.items = [];
          while (activePage.items.length < val) {
            activePage.items.push({ type: "library", id: "deer", word: "deer", displayWord: "d _ _ r" });
          }
          if (activePage.items.length > val) {
            activePage.items = activePage.items.slice(0, val);
          }
          loadActiveFBItemConfig();
          saveWorksheets();
          renderEditorWorkspace();
        }
      }
    });
  });

  // Quadrant tab switcher
  const tabs = document.querySelectorAll("#quadrant-tabs .quadrant-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      activeQuadrantIndex = parseInt(tab.getAttribute("data-quadrant"));
      activeSlotIndex = null; // reset
      loadActiveQuadrantConfig();
      renderEditorWorkspace();
    });
  });

  // Quadrant center character edit
  document.getElementById("input-center-char").addEventListener("input", (e) => {
    if (currentWorksheet) {
      const activePage = currentWorksheet.pages[activePageIndex];
      if (activePage) {
        const quad = activePage.quadrants[activeQuadrantIndex];
        if (quad) {
          quad.centerChar = e.target.value;
          saveWorksheets();
          renderEditorWorkspace();
        }
      }
    }
  });

  // Image count slider edit
  const countSlider = document.getElementById("input-image-count");
  countSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    document.getElementById("label-image-count").textContent = val;

    if (currentWorksheet) {
      const activePage = currentWorksheet.pages[activePageIndex];
      if (activePage) {
        const quad = activePage.quadrants[activeQuadrantIndex];
        if (quad) {
          quad.imageCount = val;
          // Trim images array if smaller, or extend
          while (quad.images.length < val) {
            quad.images.push(null);
          }
          if (quad.images.length > val) {
            quad.images = quad.images.slice(0, val);
          }
          saveWorksheets();
          renderSidebarSlots();
          renderEditorWorkspace();
        }
      }
    }
  });

  // Shuffle button inside quadrant editor
  document.getElementById("btn-shuffle-images").addEventListener("click", () => {
    if (currentWorksheet) {
      const activePage = currentWorksheet.pages[activePageIndex];
      if (activePage) {
        const quad = activePage.quadrants[activeQuadrantIndex];
        if (quad && quad.images.length > 0) {
          // Fisher-Yates Shuffle
          for (let i = quad.images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [quad.images[i], quad.images[j]] = [quad.images[j], quad.images[i]];
          }
          saveWorksheets();
          renderSidebarSlots();
          renderEditorWorkspace();
        }
      }
    }
  });

  // Clear quadrant button
  document.getElementById("btn-clear-quadrant").addEventListener("click", () => {
    if (currentWorksheet && confirm("Are you sure you want to clear all images in this section?")) {
      const activePage = currentWorksheet.pages[activePageIndex];
      if (activePage) {
        const quad = activePage.quadrants[activeQuadrantIndex];
        if (quad) {
          quad.images = Array(quad.imageCount).fill(null);
          saveWorksheets();
          renderSidebarSlots();
          renderEditorWorkspace();
        }
      }
    }
  });

  // Fill in the Blanks inputs
  document.getElementById("input-fb-word").addEventListener("input", (e) => {
    if (currentWorksheet) {
      const activePage = currentWorksheet.pages[activePageIndex];
      if (activePage && activePage.items) {
        const item = activePage.items[activeItemIndex];
        if (item) {
          item.word = e.target.value;
          saveWorksheets();
        }
      }
    }
  });

  document.getElementById("input-fb-display").addEventListener("input", (e) => {
    if (currentWorksheet) {
      const activePage = currentWorksheet.pages[activePageIndex];
      if (activePage && activePage.items) {
        const item = activePage.items[activeItemIndex];
        if (item) {
          item.displayWord = e.target.value;
          saveWorksheets();
          renderEditorWorkspace();
        }
      }
    }
  });

  document.getElementById("btn-fb-auto-vowels").addEventListener("click", () => {
    if (currentWorksheet) {
      const activePage = currentWorksheet.pages[activePageIndex];
      if (activePage && activePage.items) {
        const item = activePage.items[activeItemIndex];
        if (item && item.word) {
          let spaced = "";
          const word = item.word.trim();
          for (let idx = 0; idx < word.length; idx++) {
            const char = word[idx];
            if ("aeiouAEIOU".includes(char)) {
              spaced += "_ ";
            } else {
              spaced += char + " ";
            }
          }
          const finalWord = spaced.trim();
          item.displayWord = finalWord;
          document.getElementById("input-fb-display").value = finalWord;
          saveWorksheets();
          renderEditorWorkspace();
        }
      }
    }
  });

  document.getElementById("btn-fb-clear-item").addEventListener("click", () => {
    if (currentWorksheet && confirm("Are you sure you want to clear this item?")) {
      const activePage = currentWorksheet.pages[activePageIndex];
      if (activePage && activePage.items) {
        const item = activePage.items[activeItemIndex];
        if (item) {
          item.type = "";
          item.id = "";
          item.data = "";
          item.word = "";
          item.displayWord = "";
          
          document.getElementById("input-fb-word").value = "";
          document.getElementById("input-fb-display").value = "";
          loadActiveFBItemConfig();
          saveWorksheets();
          renderEditorWorkspace();
        }
      }
    }
  });

  // Close Modal trigger
  document.getElementById("btn-close-modal").addEventListener("click", closeModal);
  
  // Clear slot button in modal
  document.getElementById("btn-clear-slot").addEventListener("click", () => {
    if (currentWorksheet) {
      const activePage = currentWorksheet.pages[activePageIndex];
      if (activePage) {
        const modal = document.getElementById("image-modal");
        const isFB = modal.getAttribute("data-target-type") === "fb";
        if (isFB) {
          const item = activePage.items[activeItemIndex];
          if (item) {
            item.type = "";
            item.id = "";
            item.data = "";
          }
          saveWorksheets();
          loadActiveFBItemConfig();
          renderEditorWorkspace();
          closeModal();
        } else {
          const quad = activePage.quadrants[activeQuadrantIndex];
          if (quad) {
            quad.images[activeSlotIndex] = null;
            saveWorksheets();
            renderSidebarSlots();
            renderEditorWorkspace();
            closeModal();
          }
        }
      }
    }
  });

  // Modal selector tabs click (Library vs Upload)
  const modalTabs = document.querySelectorAll(".image-selector-tabs .image-tab");
  modalTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      modalTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const paneId = "tab-" + tab.getAttribute("data-tab");
      document.querySelectorAll(".tab-pane").forEach(pane => {
        pane.classList.remove("active");
        if (pane.id === paneId) {
          pane.classList.add("active");
        }
      });
    });
  });

  // Custom File uploader drag & drop
  const dropzone = document.getElementById("upload-dropzone");
  const fileInput = document.getElementById("file-uploader");

  dropzone.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    handleCustomImageUpload(file);
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.style.backgroundColor = "#e0e7ff";
    dropzone.style.borderColor = "#4f46e5";
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.style.backgroundColor = "#f8fafc";
    dropzone.style.borderColor = "#a5b4fc";
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.style.backgroundColor = "#f8fafc";
    dropzone.style.borderColor = "#a5b4fc";
    const file = e.dataTransfer.files[0];
    handleCustomImageUpload(file);
  });
}

// Generate PDF from the A4 workspace container
function exportToPDF() {
  if (!currentWorksheet) return;

  const pages = Array.from(document.querySelectorAll("#worksheet-pages-container .worksheet-a4-page"));
  if (pages.length === 0) return;

  // Temporarily highlight removal during print
  const prevActiveSlot = activeSlotIndex;
  const prevActiveItem = activeItemIndex;
  activeSlotIndex = null;
  activeItemIndex = null;
  document.querySelectorAll(".circle-slot-item").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".worksheet-fb-cell").forEach(c => c.classList.remove("active-cell"));
  pages.forEach(p => {
    p.style.outline = "none";
    p.style.outlineOffset = "0";
    p.style.boxShadow = "none";
  });
  document.querySelectorAll("#worksheet-pages-container .worksheet-quadrant").forEach(q => {
    q.style.borderColor = "";
    q.style.borderWidth = "";
  });

  if (currentWorksheet.type === "fill-blanks") {
    setTimeout(() => {
      window.print();
      activeSlotIndex = prevActiveSlot;
      activeItemIndex = prevActiveItem;
      if (activeSlotIndex !== null) {
        highlightWorkspaceSlot(activeSlotIndex);
      }
      renderEditorWorkspace();
    }, 100);
    return;
  }

  const jsPDFLib = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
  const canCapture = typeof html2canvas === "function" && !!jsPDFLib;

  function fallbackToPrint() {
    setTimeout(() => window.print(), 100);
  }

  if (!canCapture) {
    fallbackToPrint();
    return;
  }

  let pdf;
  try {
    pdf = new jsPDFLib({ orientation: "portrait", unit: "mm", format: "a4" });
  } catch (err) {
    fallbackToPrint();
    return;
  }

  const pageW = 210;
  const pageH = 297;

  const fontsReady = document.fonts
    ? Promise.race([document.fonts.ready, new Promise(res => setTimeout(res, 1500))])
    : Promise.resolve();

  function finishExport() {
    pdf.save((currentWorksheet.title || "worksheet").replace(/\s+/g, "_") + ".pdf");
    // Restore highlighted items after export finishes
    activeSlotIndex = prevActiveSlot;
    activeItemIndex = prevActiveItem;
    if (activeSlotIndex !== null) {
      highlightWorkspaceSlot(activeSlotIndex);
    }
    renderEditorWorkspace();
  }

  function renderPage(index) {
    if (index >= pages.length) {
      finishExport();
      return;
    }

    const el = pages[index];

    fontsReady.then(() => {
      return html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 0
      });
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");

      // Fit the page onto an exact A4 canvas (210mm x 297mm) without cropping.
      const pxWidth = el.offsetWidth;
      const pxHeight = el.offsetHeight;
      const fitScale = Math.min(pageW / pxWidth, pageH / pxHeight);
      let w = pxWidth * fitScale;
      let h = pxHeight * fitScale;
      let x = (pageW - w) / 2;
      let y = (pageH - h) / 2;

      if (Math.abs(w - pageW) < 0.5) { w = pageW; x = 0; }
      if (Math.abs(h - pageH) < 0.5) { h = pageH; y = 0; }

      if (index > 0) {
        pdf.addPage("a4", "portrait");
      }
      pdf.addImage(imgData, "PNG", x, y, w, h);

      renderPage(index + 1);
    }).catch(() => {
      fallbackToPrint();
    });
  }

  renderPage(0);
}
