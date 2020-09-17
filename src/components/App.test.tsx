import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";
import { bosses } from "../fixtures/bosses";
import { createAppTheme } from "../fixtures/theme";

test("renders without runtime errors", () => {
  expect(() =>
    render(<App theme={createAppTheme()} bosses={bosses} />)
  ).not.toThrow();
});
