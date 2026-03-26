import type { Coordinate } from "../types/entities";

export function isMatch(
  click: Coordinate,
  solution: Coordinate,
  tolerance = 5) {
  return Math.abs(click.x - solution.x) <= tolerance &&
    Math.abs(click.y - solution.y) <= tolerance;
};
