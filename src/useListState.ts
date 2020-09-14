import { useState } from "react";

export const useListState = <T>(
  initialValues: T[] | (() => T[]) = []
): [T[], Op<T>, Op<T>] => {
  const [list, setList] = useState<T[]>(initialValues);
  const add = (item: T) => {
    setList(list.concat(item));
  };
  const remove = (item: T) => {
    const index = list.indexOf(item);
    if (index !== -1) {
      const newList = list.slice();
      newList.splice(index, 1);
      setList(newList);
    }
  };
  return [list, add, remove];
};

type Op<T> = (item: T) => void;
