import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";
import { theme } from "./theme";
import { bosses } from "./bossesFixture";

test("renders without runtime errors", () => {
  expect(() => render(<App theme={theme} bosses={bosses} />)).not.toThrow();
});
