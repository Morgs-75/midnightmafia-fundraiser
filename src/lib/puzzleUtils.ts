export interface TabMap {
  rightTab: boolean[][];  // [row][col] — true = tab protrudes right
  bottomTab: boolean[][]; // [row][col] — true = tab protrudes down
}

export function generateTabMap(cols: number, rows: number): TabMap {
  const rightTab = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) =>
      c < cols - 1 ? (r * cols + c * 7 + 3) % 2 === 0 : false
    )
  );
  const bottomTab = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) =>
      r < rows - 1 ? (r + c) % 2 === 1 : false
    )
  );
  return { rightTab, bottomTab };
}

export function getPuzzlePath(
  col: number,
  row: number,
  tabMap: TabMap,
  cols: number,
  rows: number
): string {
  const D = 20; // tab depth beyond 0-100 boundary
  const S = 30; // tab start along edge
  const E = 70; // tab end along edge

  // Derive each edge: null=flat, true=tab(out), false=blank(in)
  const top    = row === 0      ? null : !tabMap.bottomTab[row - 1][col];
  const right  = col === cols - 1 ? null : tabMap.rightTab[row][col];
  const bottom = row === rows - 1 ? null : tabMap.bottomTab[row][col];
  const left   = col === 0      ? null : !tabMap.rightTab[row][col - 1];

  let d = 'M 0,0 ';

  // Top edge (left → right, y=0, tab goes negative y)
  if (top !== null) {
    const dy = top ? -D : D;
    d += `L ${S},0 C ${S},${dy} ${E},${dy} ${E},0 `;
  }
  d += 'L 100,0 ';

  // Right edge (top → bottom, x=100, tab goes positive x)
  if (right !== null) {
    const dx = right ? 100 + D : 100 - D;
    d += `L 100,${S} C ${dx},${S} ${dx},${E} 100,${E} `;
  }
  d += 'L 100,100 ';

  // Bottom edge (right → left, y=100, tab goes positive y)
  if (bottom !== null) {
    const dy = bottom ? 100 + D : 100 - D;
    d += `L ${E},100 C ${E},${dy} ${S},${dy} ${S},100 `;
  }
  d += 'L 0,100 ';

  // Left edge (bottom → top, x=0, tab goes negative x)
  if (left !== null) {
    const dx = left ? -D : D;
    d += `L 0,${E} C ${dx},${E} ${dx},${S} 0,${S} `;
  }
  d += 'L 0,0 Z';

  return d;
}
