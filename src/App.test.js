import React from "react";
import { cleanup, render, waitForElement } from "react-testing-library";
import "jest-dom/extend-expect";
import App from "./App";

test("it should render a spicy header", async () => {
  const { getByTestId } = render(<App />);
  const headerNode = await waitForElement(() => getByTestId("header"));
  expect(headerNode).toHaveTextContent("UI");
  expect(headerNode).toHaveTextContent("🔥");
});
