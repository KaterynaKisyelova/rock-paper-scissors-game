export enum Elements {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
}

export enum ElementPosition {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
  UNSET = "",
}

export type Element = { id: Elements; elementPosition: ElementPosition };

export type YourChoiceActionType = {
  type: string;
  payload: Element;
};

export type OpponentActionType = {
  type: string;
  payload: Element;
};

export type EmptyPayloadActionType = {
  type: string;
};

export type ActionType =
  | YourChoiceActionType
  | OpponentActionType
  | EmptyPayloadActionType;
