/** Pixel glove mark, drawn on a 7x8 grid. Brand symbol for SOLGLOVE. */
export function GloveMark({ size = 28 }: { size?: number }) {
  const u = size / 7;
  // 1 = mint fill, 2 = mint cuff, 0 = empty. 7 cols x 8 rows.
  const grid = [
    [0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1],
    [0, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 0],
  ];
  return (
    <svg
      width={size}
      height={(size / 7) * 8}
      viewBox={`0 0 ${size} ${(size / 7) * 8}`}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {grid.map((row, r) =>
        row.map((cell, c) =>
          cell === 0 ? null : (
            <rect
              key={`${r}-${c}`}
              x={c * u}
              y={r * u}
              width={u}
              height={u}
              fill={cell === 2 ? "var(--c-coral)" : "var(--c-mint)"}
            />
          ),
        ),
      )}
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <GloveMark size={22} />
      <span className="font-display text-[13px] tracking-tight text-paper">
        SOL<span className="text-mint">GLOVE</span>
      </span>
    </span>
  );
}
