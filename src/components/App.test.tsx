import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";
import { mobs } from "../fixtures/mobs";
import { createAppTheme } from "../fixtures/theme";

test("renders without runtime errors", () => {
  expect(() =>
    render(<App theme={createAppTheme()} mobs={mobs} />)
  ).not.toThrow();
});
