export const endT = "\\left\\{0\\le t\\le1\\right\\}";
export function cubicCoordinate(
  t0: number,
  t1: number,
  t2: number,
  t3: number
) {
  return `(1-t)((1-t)((1-t)${t0}+t${t1})+t((1-t)${t1}+t${t2}))+t((1-t)((1-t)${t1}+t${t2})+t((1-t)${t2}+t${t3}))`;
}

export function linearCoordinate(t0: number, t1: number) {
  return `(1-t)${t0}+t${t1}`;
}

export function quadraticCoordinate(p0: number, p1: number, p2: number) {
  return `((1-t)^2)\\cdot${p0}+2(1-t)t${p1}+(t^2)${p2}`;
}
