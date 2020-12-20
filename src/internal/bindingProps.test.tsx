import { fireEvent, render } from '@testing-library/react';
import { asStateView } from 'antiutils';
import React from 'react';
import { bindingProps } from './bindingProps';

it('works', () => {
  const get = jest.fn().mockReturnValue('value1');
  const set = jest.fn();
  const stateView = asStateView<string>({
    get,
    set,
  });
  const { getByRole } = render(<input {...bindingProps(stateView)} />);
  const input = getByRole('textbox');
  expect(input).toMatchInlineSnapshot(`
    <input
      value="value1"
    />
  `);
  expect(set.mock.calls).toMatchInlineSnapshot(`Array []`);
  fireEvent.change(input, { target: { value: 'value2' } });
  expect(set.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "value2",
      ],
    ]
  `);
});
