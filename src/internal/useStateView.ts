import { StateView } from 'antiutils';
import React from 'react';

export const useStateView = <State>(
  initialState: State | (() => State),
): StateView<State> => {
  const [state, setState] = React.useState(initialState);
  return {
    get: () => state,
    set: (value: State) =>
      // Using a callback because `value` can be a function.
      setState(() => value),
  };
};
