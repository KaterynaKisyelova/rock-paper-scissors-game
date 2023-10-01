import createSagaMiddleware from "redux-saga";
import gameReducer from "./reducers/gameReducer";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { mainSaga } from "../sagas/";

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({ gameReducer });

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mainSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
