import { all } from "redux-saga/effects";
import {
  animateWinnerWorkerSaga,
  connectWorkerSaga,
  makeChoiceWorkerSaga,
  showResultWorkerSaga,
  watchOnSocket,
} from "./gameSagas";

export function* mainSaga() {
  yield all([
    watchOnSocket(),
    makeChoiceWorkerSaga(),
    showResultWorkerSaga(),
    animateWinnerWorkerSaga(),
    connectWorkerSaga(),
  ]);
}
