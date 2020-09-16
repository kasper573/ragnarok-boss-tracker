import { useState } from "react";

export const useListState = <T>(
  initialValues: T[] | (() => T[]) = []
): [T[], Op<T>, Op<T>, (i: T, r: T) => void] => {
  const [list, setList] = useState<T[]>(initialValues);
  const add = (item: T) => {
    setList(list.concat(item));
  };
  const splice = (item: T, ...insert: T[]) => {
    const index = list.indexOf(item);
    if (index !== -1) {
      const newList = list.slice();
      newList.splice(index, 1, ...insert);
      setList(newList);
    }
  };
  const replace = (item: T, newItem: T) => splice(item, newItem);
  return [list, add, splice, replace];
};

type Op<T> = (item: T) => void;
