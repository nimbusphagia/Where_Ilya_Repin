import { useParams } from "react-router";
import { Game } from "./Game";

export const GameWrapper = () => {
  const { id } = useParams();
  return <Game key={id} />;
};
