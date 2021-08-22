import { AppState } from "./store";

const storageId = "rbt-state";

export const saveToLocalStorage = (state: AppState) => {
  localStorage.setItem(storageId, JSON.stringify(state));
};

export const loadFromLocalStorage = (): AppState | undefined => {
  const json = localStorage.getItem(storageId);
  try {
    if (json) {
      return JSON.parse(json);
    }
  } catch (e) {}
};
