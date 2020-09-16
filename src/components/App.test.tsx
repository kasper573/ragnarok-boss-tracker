import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";
import { bosses } from "../fixtures/bossesFixture";

test("renders without runtime errors", () => {
  expect(() => render(<App bosses={bosses} />)).not.toThrow();
});
