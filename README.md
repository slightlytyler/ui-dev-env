# UI Dev Env

## Use guide

#### Development

From your development directory, `<dev>`, create a file `<dev>/src/App.js`.
Here's an example component.

```js
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
```

Then from `<dev>` run:

```sh
docker run -it --rm -p 3000:3000 -v $(PWD)/src:/usr/app/src slightlytyler/ui-dev-env dev
```

#### Testing

To use tests, create a test file `<dev>/src/App.test.js`. 
Here's an example test.

```js
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
```

Then from `<dev>` run:

```sh
docker run -it --rm -p 3000:3000 -v $(PWD)/src:/usr/app/src slightlytyler/ui-dev-env test
```

#### Formatting

To format the source files run:

```sh
docker run -it --rm -p 3000:3000 -v $(PWD)/src:/usr/app/src slightlytyler/ui-dev-env fmt
```

## Dev

### Building

```sh
make build
```

### Running

```sh
make run ARGS="fmt"
```

### Test dev command

```sh
make run-dev
```

### Shortcuts

```sh
make run-fmt
```

```sh
make run-test
```

### Project administration

```sh
make run-yarn ARGS="add some-package"
```

### Publish

Increment `VERSION` in the `Makefile` then:

```sh
make publish
```

### Push

To push up the current tag (as tagged by the Git SHA):

```
make push
```