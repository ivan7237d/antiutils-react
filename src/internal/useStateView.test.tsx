import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { bindingPropsCheckbox } from './bindingPropsCheckbox';
import { useStateView } from './useStateView';

it('works', () => {
  const Component = () => {
    const stateView = useStateView(true);
    return (
      <input
        className={stateView.get() ? 'checked' : 'unchecked'}
        type="checkbox"
        {...bindingPropsCheckbox(stateView)}
      />
    );
  };
  const { getByRole } = render(<Component />);
  const input = getByRole('checkbox');
  if (!(input instanceof HTMLInputElement)) {
    throw undefined;
  }
  expect(input.checked).toMatchInlineSnapshot(`true`);
  expect(input.className).toMatchInlineSnapshot(`"checked"`);
  fireEvent.click(input);
  expect(input.checked).toMatchInlineSnapshot(`false`);
  expect(input.className).toMatchInlineSnapshot(`"unchecked"`);
});
