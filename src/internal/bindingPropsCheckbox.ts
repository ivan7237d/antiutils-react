import { StateView } from 'antiutils';

export const bindingPropsCheckbox = ({
  get,
  set,
}: StateView<boolean>): {
  checked: boolean;
  onChange: ({
    currentTarget: { checked },
  }: {
    currentTarget: {
      checked: boolean;
    };
  }) => void;
} => ({
  checked: get(),
  onChange: ({ currentTarget: { checked } }) => {
    set(checked);
  },
});
