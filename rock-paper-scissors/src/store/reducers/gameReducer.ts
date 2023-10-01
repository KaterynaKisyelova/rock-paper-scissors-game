import {
  ActionType,
  Element,
  Elements,
  OpponentActionType,
  EmptyPayloadActionType,
  YourChoiceActionType,
} from "../../types/types";
import { defineWinner } from "../../utils/helpers";
import {
  ANIMATED_WINNER,
  CALCULATE_RESULTS_AND_SAVE_TO_STORAGE,
  CONNECTED,
  MADE_CHOICE,
  OPPONENT_CHOICE,
  PLAYERS_CONNECTED,
  PLAYER_DISCONNECTED,
  RESULT_READY,
} from "../actions";

type InitialState = {
  chosenElement: Element | null;
  opponentElement: Element | null;
  arePlayersConnected: boolean;
  isConnected: boolean;
  score: number;
  winner: { score: number; element: string };
  isResult: boolean;
  isAnimated: boolean;
};

const initialState: InitialState = {
  chosenElement: null,
  opponentElement: null,
  arePlayersConnected: false,
  isConnected: false,
  score: 0,
  winner: { score: 0, element: "" },
  isResult: false,
  isAnimated: false,
};

function isNotEmptyPayloadAction(
  action: YourChoiceActionType | OpponentActionType | EmptyPayloadActionType
): action is YourChoiceActionType | OpponentActionType {
  return (
    (action as YourChoiceActionType | OpponentActionType).payload !== undefined
  );
}

function saveToSessionStorage(score: number) {
  sessionStorage.setItem("gameScore", JSON.stringify(score));
}

function gameReducer(state = initialState, action: ActionType): InitialState {
  switch (action.type) {
    case MADE_CHOICE: {
      if (!isNotEmptyPayloadAction(action)) {
        return { ...state };
      }

      if (Object.values(Elements).includes(action.payload.id)) {
        return { ...state, chosenElement: action.payload };
      }

      return { ...state };
    }
    case CONNECTED: {
      return { ...state, isConnected: true };
    }
    case PLAYERS_CONNECTED: {
      return { ...state, arePlayersConnected: true };
    }
    case PLAYER_DISCONNECTED: {
      return { ...state, arePlayersConnected: false };
    }
    case OPPONENT_CHOICE: {
      if (!isNotEmptyPayloadAction(action)) {
        return { ...state };
      }

      if (Object.values(Elements).includes(action.payload.id)) {
        return { ...state, opponentElement: action.payload };
      }

      return { ...state };
    }
    case CALCULATE_RESULTS_AND_SAVE_TO_STORAGE: {
      if (!state.chosenElement || !state.opponentElement) {
        return { ...state };
      }

      const winner = defineWinner(
        state.chosenElement.id,
        state.opponentElement.id
      );

      const newScore = state.score + winner.score;

      saveToSessionStorage(newScore);

      return {
        ...state,
        score: newScore,
        winner,
      };
    }
    case RESULT_READY: {
      return { ...state, isResult: true };
    }
    case ANIMATED_WINNER: {
      return { ...state, isAnimated: true };
    }
    default: {
      return { ...state };
    }
  }
}

export default gameReducer;
