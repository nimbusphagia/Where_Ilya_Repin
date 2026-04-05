import type { CoordinateInput } from "../schemas/level.schema";

export function isMatch(
  click: CoordinateInput,
  solution: CoordinateInput,
  tolerance = 5) {
  return Math.abs(click.x - solution.x) <= tolerance &&
    Math.abs(click.y - solution.y) <= tolerance;
};
