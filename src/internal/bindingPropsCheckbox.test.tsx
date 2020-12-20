import { fireEvent, render } from '@testing-library/react';
import { asStateView } from 'antiutils';
import React from 'react';
import { bindingPropsCheckbox } from './bindingPropsCheckbox';

it('works', () => {
  const get = jest.fn().mockReturnValue(true);
  const set = jest.fn();
  const stateView = asStateView<boolean>({
    get,
    set,
  });
  const { getByRole } = render(
    <input type="checkbox" {...bindingPropsCheckbox(stateView)} />,
  );
  const input = getByRole('checkbox');
  if (!(input instanceof HTMLInputElement)) {
    throw undefined;
  }
  expect(input.checked).toMatchInlineSnapshot(`true`);
  expect(set.mock.calls).toMatchInlineSnapshot(`Array []`);
  fireEvent.click(input);
  expect(set.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        false,
      ],
    ]
  `);
});
