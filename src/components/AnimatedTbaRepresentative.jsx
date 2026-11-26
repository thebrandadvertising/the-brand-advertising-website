import "./animated-tba-representative.css";

export default function AnimatedTbaRepresentative() {
  return (
    <svg className="tba-guide-art" viewBox="0 0 440 520" role="img" aria-label="Animated TBA representative welcoming visitors" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="guide-shirt" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#243f73" /><stop offset="1" stopColor="#101d39" /></linearGradient>
        <linearGradient id="guide-skin" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#f7c7a3" /><stop offset="1" stopColor="#d99270" /></linearGradient>
        <linearGradient id="guide-blue" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#4cc7ff" /><stop offset="1" stopColor="#1676ff" /></linearGradient>
        <filter id="guide-shadow" x="-30%" y="-20%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#06152f" floodOpacity=".24" /></filter>
      </defs>
      <ellipse cx="226" cy="489" rx="127" ry="17" fill="#05132b" opacity=".24" />
      <g className="tba-guide-body" filter="url(#guide-shadow)">
        <path d="M132 151c-13-65 24-112 84-114 63-2 97 40 91 105l-10 107-33 37-125-13-27-41z" fill="#241a1b" />
        <path d="M152 119c-2-43 24-72 64-74 45-3 72 27 71 68-1 24-8 41-18 53l-11-56c-25 5-61-7-83-29-3 19-11 35-23 49z" fill="#382326" />
        <g className="tba-guide-wave">
          <path d="M173 270c-33 4-62 20-93 42l-30 21c-11 8-23 3-26-7-2-8 4-15 14-22l31-22c24-18 53-38 85-47z" fill="url(#guide-shirt)" />
          <path d="M38 327c-11 1-18-5-17-13 1-7 9-12 20-11l20 2 14-8 14 9-15 15c-9 8-23 12-36 6z" fill="url(#guide-skin)" />
          <path d="M25 308l-11-4m14 11-13 1m16 6-9 7" stroke="#d99270" strokeWidth="4" strokeLinecap="round" />
        </g>
        <path d="M144 257c19-17 40-24 69-24s52 8 74 25l36 133-18 94H102l-6-94z" fill="url(#guide-shirt)" />
        <path d="M189 228h47v46l-23 24-25-24z" fill="url(#guide-skin)" />
        <path d="M189 253l24 27 23-27 29 19-28 43h-49l-29-42z" fill="#f8fbff" />
        <path d="M213 281l-9 15 9 12 9-12z" fill="url(#guide-blue)" />
        <path d="M196 307h49" stroke="#e7edf8" strokeWidth="2" opacity=".7" />
        <path d="M274 280c21 7 32 23 39 45l24 87c4 13-3 24-15 25-10 1-16-5-20-16l-30-79-23-42z" fill="url(#guide-skin)" />
        <g transform="rotate(7 312 380)"><rect x="300" y="311" width="30" height="139" rx="6" fill="#d7e4f9" /><rect x="304" y="316" width="22" height="128" rx="3" fill="#31527e" /><path d="M309 326h12" stroke="#83caff" strokeWidth="2" strokeLinecap="round" /></g>
        <path d="M276 277c10 3 19 8 27 16l-13 30-23-21z" fill="#f8fbff" />
        <path d="M109 405h204l-15 88h-79l-8-57-9 57h-79z" fill="#111b2c" /><path d="M108 402h202v18H108z" fill="#273449" />
        <rect x="198" y="400" width="31" height="22" rx="4" fill="#d5e0ee" /><rect x="206" y="406" width="15" height="10" rx="2" fill="#253753" />
        <path d="M122 441h55m74 0h42" stroke="#28364c" strokeWidth="4" strokeLinecap="round" />
        <path d="M151 118c2-48 30-73 66-73 42 0 66 30 64 76l-4 61c-2 37-27 63-61 63-36 0-62-28-63-66z" fill="url(#guide-skin)" />
        <path d="M149 128c-21-49 5-92 50-99 57-9 88 21 95 72-26-4-52-17-68-39-13 26-38 45-77 52z" fill="#352225" />
        <path d="M151 125c-13 29-10 74 7 104-20-10-35-35-34-65 0-22 9-38 27-50z" fill="#2a1d21" /><path d="M275 114c19 27 20 80 2 111 21-12 34-39 31-67-2-20-13-36-33-44z" fill="#2a1d21" />
        <path d="M166 137c12-10 26-12 40-7m28 0c13-6 27-4 39 6" fill="none" stroke="#5b342b" strokeWidth="6" strokeLinecap="round" />
        <g className="tba-guide-eyes"><ellipse cx="187" cy="158" rx="10" ry="13" fill="#241d24" /><ellipse cx="252" cy="158" rx="10" ry="13" fill="#241d24" /><circle cx="190" cy="154" r="3" fill="white" /><circle cx="255" cy="154" r="3" fill="white" /></g>
        <path d="M215 159l-7 28c-1 5 3 8 10 7" fill="none" stroke="#c47d62" strokeWidth="4" strokeLinecap="round" /><path d="M190 204c15 17 42 18 58-1" fill="none" stroke="#994a4c" strokeWidth="5" strokeLinecap="round" /><path d="M196 205c13 8 29 8 42-1" stroke="#fff2e9" strokeWidth="4" strokeLinecap="round" />
        <circle cx="143" cy="181" r="11" fill="#dfa17e" /><circle cx="284" cy="181" r="11" fill="#dfa17e" /><path d="M143 180v21m141-21v21" stroke="#e8bd84" strokeWidth="4" />
        <g className="tba-guide-mark" transform="translate(243 342)"><text x="0" y="0" fill="#fff" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="19">TBA</text><path d="M38-15l8 0-10 17h-8z" fill="url(#guide-blue)" /><text x="1" y="12" fill="#dce8ff" fontFamily="Arial,sans-serif" fontWeight="600" fontSize="5.5" letterSpacing=".6">THE BRAND ADVERTISING</text></g>
      </g>
      <path className="tba-guide-spark tba-guide-spark-one" d="M86 177l4-12m8 20 12-4m-16-13 2-13" stroke="#76d7ff" strokeWidth="4" strokeLinecap="round" />
      <path className="tba-guide-spark tba-guide-spark-two" d="M336 192l4-13m8 19 11-4" stroke="#76d7ff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
