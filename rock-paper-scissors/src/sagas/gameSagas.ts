// @ts-nocheck
import { call, put, select, take, takeEvery } from "redux-saga/effects";
import {
  CALCULATE_RESULTS_AND_SAVE_TO_STORAGE,
  CONNECT,
  CONNECTED,
  MADE_CHOICE,
  MAKE_CHOICE,
  OPPONENT_CHOICE,
  PLAYERS_CONNECTED,
  SHOW_RESULT,
  RESULT_READY,
  ANIMATE_WINNER,
  ANIMATED_WINNER,
} from "../store/actions";
import { Socket, io } from "socket.io-client";
import { eventChannel } from "redux-saga";
import { Element } from "../types/types";

const socket = io("ws://localhost:3000");

const connect = () => {
  new Promise((resolve) => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
};

function createSocketChannel(socket: Socket) {
  return eventChannel((emit) => {
    const payloadHandler = (e: {
      payload:
        | { connected: boolean }
        | { playAgain: boolean }
        | { element: Element }
        | { disconnect: boolean };
    }) => {
      console.log(e.payload);
      emit(e.payload);
    };

    socket.on("playersConnected", payloadHandler);
    socket.on("chosenElement", payloadHandler);
    socket.on("playerDisconnected", payloadHandler);

    const unsubscribe = () => {};

    return unsubscribe;
  });
}

const choose = (element: Element) => {
  socket.emit("chooseElement", element);
};

function* connectWorker() {
  yield call(connect);
  yield put({ type: CONNECTED });
}

function* makeChoiceWorker(action: MakeChoiceActionType) {
  yield call(choose, action.payload);
  yield put({ type: MADE_CHOICE, payload: action.payload });
  const { opponentElement } = yield select((state) => state.gameReducer);

  if (!opponentElement) {
    return;
  }

  yield put({ type: CALCULATE_RESULTS_AND_SAVE_TO_STORAGE });
}

function* showResultWorker() {
  yield put({ type: RESULT_READY });
}

function* animateWinnerWorker() {
  yield put({ type: ANIMATED_WINNER });
}

export function* connectWorkerSaga() {
  yield takeEvery(CONNECT, connectWorker);
}

export function* watchOnSocket() {
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    const payload = yield take(socketChannel);

    if (payload.connected) {
      yield put({ type: PLAYERS_CONNECTED });
    }

    if (payload.element) {
      yield put({ type: OPPONENT_CHOICE, payload: payload.element });

      const { chosenElement } = yield select((state) => state.gameReducer);

      if (!chosenElement) {
        return;
      }

      yield put({ type: CALCULATE_RESULTS_AND_SAVE_TO_STORAGE });
    }
  }
}

export function* makeChoiceWorkerSaga() {
  yield takeEvery(MAKE_CHOICE, makeChoiceWorker);
}

export function* showResultWorkerSaga() {
  yield takeEvery(SHOW_RESULT, showResultWorker);
}

export function* animateWinnerWorkerSaga() {
  yield takeEvery(ANIMATE_WINNER, animateWinnerWorker);
}

