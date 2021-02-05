# antiutils-react

[![npm version](https://img.shields.io/npm/v/antiutils-react.svg?style=flat&color=brightgreen)](https://www.npmjs.com/package/antiutils-react)
[![gzip size](https://badgen.net/bundlephobia/minzip/antiutils-react?color=green)](https://bundlephobia.com/result?p=antiutils-react)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/antiutils-react)](https://bundlephobia.com/result?p=antiutils-react)
[![types](https://img.shields.io/npm/types/antiutils-react?color=brightgreen)](https://www.npmjs.com/package/antiutils-react)

Glue between [Antiutils](https://github.com/ivan7237d/antiutils) and React. Provides the following utilities:

- [`useStateView`](https://github.com/ivan7237d/antiutils-react/blob/master/src/internal/useStateView.ts): wraps `useState` hook, converting the returned value to a `StateView`.

- [`bindingProps`](https://github.com/ivan7237d/antiutils-react/blob/master/src/internal/bindingProps.ts): a helper function that converts a `StateView` into an object with props that React input components other than checkboxes understand, so `{ get, set }` would be transformed into `{ value: get(), onChange: ({ currentTarget: { value } }) => set(value) }`.

- [`bindingPropsCheckbox`](https://github.com/ivan7237d/antiutils-react/blob/master/src/internal/bindingPropsCheckbox.ts): a version of `bindingProps` for checkboxes: transforms `{ get, set }` into `{ checked: get(), onChange: ({ currentTarget: { checked } }) => set(checked) }`.

## Installing

```
yarn add antiutils-react
```

or

```
npm install antiutils-react --save
```

Requires `antiutils` and `react` as peer dependencies.

## Usage

```ts
import { applyPipe, objectProp, StateView } from 'antiutils';
import {
  bindingProps,
  bindingPropsCheckbox,
  useStateView,
} from 'antiutils-react';
import React from 'react';

type State = { a: { b: string; c: boolean } };

/**
 * A component that encapsulates presentation logic but is agnostic as to how we
 * manage state.
 */
const StatelessComponent = ({ stateView }: { stateView: StateView<State> }) => (
  <>
    {/* A textbox bound to 'b'. */}
    <input
      type="text"
      {...applyPipe(
        stateView,
        // Transforms values into `StateView<{ b: string; c: boolean }>`.
        objectProp('a'),
        // Transforms values into `StateView<string>`.
        objectProp('b'),
        // Transforms values into
        // {
        //   value: string;
        //   onChange: (event: { currentTarget: { value: string } }) => void;
        // }
        bindingProps,
      )}
    />
    {/* A checkbox bound to 'c'. */}
    <input
      type="checkbox"
      {...applyPipe(
        stateView,
        objectProp('a'),
        objectProp('c'),
        bindingPropsCheckbox,
      )}
    />
  </>
);

export const StatefulComponent = () => {
  const stateView = useStateView<State>({ a: { b: '', c: false } });
  return <StatelessComponent {...{ stateView }} />;
};
```

---

[Contributing guidelines](https://github.com/ivan7237d/antiutils/blob/master/.github/CONTRIBUTING.md)
