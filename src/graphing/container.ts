import { Expression } from "./expression";
import {
  cubicCoordinate,
  endT,
  linearCoordinate,
  quadraticCoordinate,
} from "./graphs";

export class Container {
  x = 0;
  y = 0;
  startX = 0;
  startY = 0;
  assignedFirstCoordinates = false;
  viewBoxX: number[];
  viewBoxY: number[];
  readonly expressions: Expression[];
  index = 0;

  constructor(
    expressions: Expression[],
    viewBoxX: number[],
    viewBoxY: number[]
  ) {
    this.expressions = expressions;
    this.viewBoxX = viewBoxX;
    this.viewBoxY = viewBoxY;

    // typescript shitting itself
    this.tx = this.tx.bind(this);
    this.ty = this.ty.bind(this);
  }

  length() {
    return this.expressions.length;
  }

  hasNext() {
    return this.index < this.expressions.length;
  }

  next() {
    let exp = this.expressions[this.index];
    this.index++;
    return exp;
  }

  tx(val: number) {
    // shifts value to viewport
    return this.viewBoxX[0] + val;
  }

  ty(val: number) {
    return this.viewBoxY[1] - val + this.viewBoxY[0];
  }

  parse(exp: Expression): string | undefined {
    const { type, args } = exp;

    let t = type.toLowerCase();

    if (t == "m") {
      // move
      this.x = args[0];
      this.y = args[1];

      if (!this.assignedFirstCoordinates) {
        this.startX = this.x;
        this.startY = this.y;
        this.assignedFirstCoordinates = true;
      }
    } else if (t == "l") {
      // linear
      let { x, y } = this;

      this.x = args[0];
      this.y = args[1];

      // shorthand
      const { tx, ty } = this;

      return `(${linearCoordinate(tx(x), tx(args[0]))}, ${linearCoordinate(
        ty(y),
        ty(args[1])
      )})${endT}`;
    } else if (t == "h") {
    } else if (t == "v") {
    } else if (t == "z") {
      // shorthand
      const { tx, ty } = this;

      let { x, y } = this;

      this.x = this.startX;
      this.y = this.startY;

      return `(${linearCoordinate(tx(x), tx(this.startX))}, ${linearCoordinate(
        ty(y),
        ty(this.startY)
      )})${endT}`;
    } else if (t == "c") {
      // cubic
      let { x, y } = this;
      this.x = args[4];
      this.y = args[5];

      // shorthand
      const { tx, ty } = this;

      return `(${cubicCoordinate(
        tx(x),
        tx(args[0]),
        tx(args[2]),
        tx(args[4])
      )}, ${cubicCoordinate(
        ty(y),
        ty(args[1]),
        ty(args[3]),
        ty(args[5])
      )})${endT}`;
    } else if (t == "q") {
      // quadratic
      let { x, y } = this;
      this.x = args[2];
      this.y = args[3];

      // shorthand
      const { tx, ty } = this;

      return `(${quadraticCoordinate(
        tx(x),
        tx(args[0]),
        tx(args[2])
      )}, ${quadraticCoordinate(ty(y), ty(args[1]), ty(args[3]))})${endT}`;
    }

    return undefined;
  }

  toString() {
    return this.expressions
      .map((e) => `${e.type} ${e.args.join(" ")}`)
      .join("\n");
  }
}
