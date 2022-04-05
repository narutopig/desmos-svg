import { Container } from "./container";
import { Expression } from "./expression";

function isLetter(c: string) {
  // only before parse function
  return isNaN(parseFloat(c));
}

function toReadable(text: string): string[] {
  // converts all svgs to a parseable format
  let currBlock = "";
  let chars = text.split("");

  let blocks = [];

  for (let i = 0; i < chars.length; i++) {
    if (
      isLetter(chars[i]) &&
      chars[i] !== "." &&
      chars[i] !== " " &&
      chars[i] !== "-" &&
      currBlock !== "" &&
      currBlock !== ","
    ) {
      ``;
      blocks.push(currBlock);
      currBlock = "";
      blocks.push(chars[i]);
    } else if ((chars[i] === " " || chars[i] == ",") && currBlock !== "") {
      blocks.push(currBlock);
      currBlock = "";
    } else {
      // regular digit or period
      currBlock += chars[i];
    }
  }

  blocks.push(currBlock);

  return blocks;
}

export function parseContainer(
  text: string,
  vbx: number[],
  vby: number[]
): Container {
  let expressions: Expression[] = [];
  let t = toReadable(text);
  console.log({ t });
  let chars = t;
  let currOp = "";
  let currArgs: number[] = [];

  for (let i = 0; i < chars.length; i++) {
    if (isLetter(chars[i])) {
      if (currOp == "") {
        // first command
        currOp = chars[i];
        continue;
      }
      let e = { type: currOp, args: currArgs };
      currArgs = [];
      console.log(e);
      expressions.push(e);
      currOp = chars[i];
    } else {
      // its a number
      currArgs.push(parseFloat(chars[i]));
    }
  }

  expressions.push({ type: currOp, args: currArgs });

  return new Container(expressions, vbx, vby);
}
