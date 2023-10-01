import { ElementPosition, Elements } from "../../types/types";

export const MAKE_CHOICE = "MAKE_CHOICE";
export const PLAYERS_CONNECTED = "PLAYERS_CONNECTED";
export const CONNECT = "CONNECT";
export const CONNECTED = "CONNECTED";
export const PLAYER_DISCONNECTED = "DISCONNECTED";
export const MADE_CHOICE = "MADE_CHOICE";
export const OPPONENT_CHOICE = "OPPONENT_CHOICE";
export const CALCULATE_RESULTS_AND_SAVE_TO_STORAGE =
  "CALCULATE_RESULTS_AND_SAVE_TO_STORAGE";
export const SHOW_RESULT = "SHOW_RESULT";
export const RESULT_READY = "RESULT_READY";
export const ANIMATE_WINNER = "ANIMATE_WINNER";
export const ANIMATED_WINNER = "ANIMATED_WINNER";

export function connect() {
  return { type: CONNECT };
}

export function chooseElement(element: {
  id: Elements;
  elementPosition: ElementPosition;
}) {
  return { type: MAKE_CHOICE, payload: element };
}

export function showResult() {
  return { type: SHOW_RESULT };
}

export function animate() {
  return { type: ANIMATE_WINNER };
}
