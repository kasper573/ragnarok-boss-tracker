import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders without runtime errors", () => {
  expect(() => render(<App />)).not.toThrow();
});
