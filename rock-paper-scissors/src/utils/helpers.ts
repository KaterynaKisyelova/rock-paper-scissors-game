import imgs from "../assets/images";
import { Elements } from "../types/types";

export function findImage(name: Elements) {
  return imgs.find((image) => image.name === name);
}

export function defineWinner(
  chosenElement: Elements,
  opponentElement: Elements
): { score: number; element: string } {
  let winner = { score: 0, element: "" };
  if (chosenElement === opponentElement) {
    winner = { score: 0, element: "" };
    return winner;
  }
  if (chosenElement === Elements.ROCK) {
    winner =
      opponentElement === Elements.PAPER
        ? { score: -1, element: Elements.PAPER }
        : { score: 1, element: Elements.ROCK };
    return winner;
  }
  if (chosenElement === Elements.PAPER) {
    winner =
      opponentElement === Elements.SCISSORS
        ? { score: -1, element: Elements.SCISSORS }
        : { score: 1, element: Elements.PAPER };
    return winner;
  }
  if (chosenElement === Elements.SCISSORS) {
    winner =
      opponentElement === Elements.ROCK
        ? { score: -1, element: Elements.ROCK }
        : { score: 1, element: Elements.SCISSORS };
    return winner;
  }
  return winner;
}
