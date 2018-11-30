import styled from "@emotion/styled";
import React from "react";

const Header = styled("h1")`
  font-family: sans-serif;
`;

const App = () => (
  <div>
    <Header data-testid="header">🔥 UI Dev Env</Header>
  </div>
);

export default App;
