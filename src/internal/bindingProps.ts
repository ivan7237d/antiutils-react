import { StateView } from 'antiutils';

export const bindingProps = <Value>({
  get,
  set,
}: StateView<Value>): {
  value: Value;
  onChange: ({
    currentTarget: { value },
  }: {
    currentTarget: {
      value: Value;
    };
  }) => void;
} => ({
  value: get(),
  onChange: ({ currentTarget: { value } }) => {
    set(value);
  },
});
