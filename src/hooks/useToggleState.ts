import { useState } from "react";

export function useToggleState<T>(
  defaultValue: T,
  otherValue: T
): [T, () => void] {
  const [value, setValue] = useState(defaultValue);
  const toggleValue =
    value === defaultValue
      ? () => setValue(otherValue)
      : () => setValue(defaultValue);
  return [value, toggleValue];
}
