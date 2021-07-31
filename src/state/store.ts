import { configureStore } from "@reduxjs/toolkit";
import { PreloadedState } from "redux";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  useStore as useReduxStore,
} from "react-redux";
import { slice } from "./slice";

export const createStore = (preloadedState?: PreloadedState<AppState>) =>
  configureStore({
    reducer: slice.reducer,
  });

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppState = ReturnType<typeof slice.reducer>;

export const useStore: () => AppStore = useReduxStore;
export const useDispatch: () => AppDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
