import { useMemo } from "react";

// Lightweight SVG "network of points" animation (no WebGL / no three.js)
// Renders a set of nodes with connecting lines and gentle pulse/float motion.
export default function HeroNetwork() {
  const { nodes, links } = useMemo(() => {
    const COUNT = 26;
    const W = 100;
    const H = 60;
    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    };
    const r = rng(7);
    const nodes = Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      x: r() * W,
      y: r() * H,
      delay: r() * 4,
      dur: 3 + r() * 4,
      size: 0.5 + r() * 0.9,
    }));
    const LINK_DIST = 22;
    const links: { a: number; b: number; o: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          links.push({ a: i, b: j, o: 1 - d / LINK_DIST });
        }
      }
    }
    return { nodes, links };
  }, []);

  return (
    <svg
      viewBox="0 0 100 60"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="qc-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g>
        {links.map((l, i) => (
          <line
            key={i}
            x1={nodes[l.a].x}
            y1={nodes[l.a].y}
            x2={nodes[l.b].x}
            y2={nodes[l.b].y}
            stroke="hsl(var(--primary))"
            strokeWidth={0.12}
            strokeOpacity={0.18 + l.o * 0.35}
          >
            <animate
              attributeName="stroke-opacity"
              values={`${0.1 + l.o * 0.2};${0.25 + l.o * 0.45};${0.1 + l.o * 0.2}`}
              dur={`${4 + (i % 5)}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </g>
      <g>
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={n.size * 1.8} fill="url(#qc-node)" opacity={0.5}>
              <animate
                attributeName="opacity"
                values="0.15;0.55;0.15"
                dur={`${n.dur}s`}
                begin={`${n.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={n.x} cy={n.y} r={n.size * 0.45} fill="hsl(var(--primary))" />
          </g>
        ))}
      </g>
    </svg>
  );
}
