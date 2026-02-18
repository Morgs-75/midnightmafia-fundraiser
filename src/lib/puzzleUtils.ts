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
  // Traditional puzzle piece proportions:
  //   A–B   = where the tab attaches to the edge (~34% of edge width)
  //   KD    = how far the round knob protrudes beyond the boundary
  //   KW    = half-width of the knob at its widest (controls roundness of top)
  //   SH/SW = shoulder: the path dips slightly INWARD at the tab base before
  //           going outward — this concave "armpit" is the hallmark of a real
  //           puzzle piece.  Sockets get the mirror: a tiny convex shoulder.
  const A  = 33;
  const B  = 67;
  const KD = 18;
  const KW = 12;
  const SH = 5;   // how far the shoulder dips inside / outside the boundary
  const SW = 5;   // how far along the edge the shoulder sits before the neck

  // Each edge: null = flat outer border, true = tab (out), false = socket (in)
  const top    = row === 0        ? null : !tabMap.bottomTab[row - 1][col];
  const right  = col === cols - 1 ? null : tabMap.rightTab[row][col];
  const bottom = row === rows - 1 ? null : tabMap.bottomTab[row][col];
  const left   = col === 0        ? null : !tabMap.rightTab[row][col - 1];

  // Each tab = 2 cubic beziers (left arm + right arm).
  // s = +1 for tab (protrudes out), −1 for socket (dips in).
  //
  // Shoulder trick: CP1 pulls *with* s in the perpendicular direction
  // (into the tile for a tab, out of the tile for a socket), matching
  // the classic concave-armpit / convex-lip geometry of real puzzle pieces.
  // The two arms meet at the knob centre with horizontal tangents → smooth round head.

  let d = 'M 0,0 ';

  // ── Top edge  (left → right along y = 0) ──────────────────────────────────
  if (top !== null) {
    const s = top ? 1 : -1;
    d += `L ${A},0 `;
    d += `C ${A + SW},${s * SH} ${50 - KW},${-s * KD} 50,${-s * KD} `;
    d += `C ${50 + KW},${-s * KD} ${B - SW},${s * SH} ${B},0 `;
  }
  d += 'L 100,0 ';

  // ── Right edge  (top → bottom along x = 100) ──────────────────────────────
  if (right !== null) {
    const s = right ? 1 : -1;
    d += `L 100,${A} `;
    d += `C ${100 - s * SH},${A + SW} ${100 + s * KD},${50 - KW} ${100 + s * KD},50 `;
    d += `C ${100 + s * KD},${50 + KW} ${100 - s * SH},${B - SW} 100,${B} `;
  }
  d += 'L 100,100 ';

  // ── Bottom edge  (right → left along y = 100) ─────────────────────────────
  if (bottom !== null) {
    const s = bottom ? 1 : -1;
    d += `L ${B},100 `;
    d += `C ${B - SW},${100 - s * SH} ${50 + KW},${100 + s * KD} 50,${100 + s * KD} `;
    d += `C ${50 - KW},${100 + s * KD} ${A + SW},${100 - s * SH} ${A},100 `;
  }
  d += 'L 0,100 ';

  // ── Left edge  (bottom → top along x = 0) ─────────────────────────────────
  if (left !== null) {
    const s = left ? 1 : -1;
    d += `L 0,${B} `;
    d += `C ${s * SH},${B - SW} ${-s * KD},${50 + KW} ${-s * KD},50 `;
    d += `C ${-s * KD},${50 - KW} ${s * SH},${A + SW} 0,${A} `;
  }
  d += 'L 0,0 Z';

  return d;
}
