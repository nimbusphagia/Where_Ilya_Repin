export type User = {
  username: string,
  status: boolean,
  email?: string,
}
export type Coordinate = {
  id?: string,
  x: number,
  y: number
};

export type GameLevel = {
  id: string,
  name: string,
  source: string,
  solutions: readonly [Coordinate, Coordinate, Coordinate],
}

export type Solution = Coordinate & {
  solved: boolean,
}
