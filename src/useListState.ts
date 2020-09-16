import { useState } from "react";

export const useListState = <T>(
  initialValues: T[] | (() => T[]) = [],
  emit: (list: T[]) => void = () => {}
): [T[], Op<T>, Op<T>, (i: T, r: T) => boolean] => {
  const [list, setList] = useState<T[]>(initialValues);
  const setListAndEmit = (newList: T[]) => {
    setList(newList);
    emit(newList);
  };
  const add = (item: T) => {
    setListAndEmit(list.concat(item));
  };
  const splice = (item: T, ...insert: T[]) => {
    const index = list.indexOf(item);
    if (index !== -1) {
      const newList = list.slice();
      newList.splice(index, 1, ...insert);
      setListAndEmit(newList);
      return true;
    }
    return false;
  };
  const replace = (item: T, newItem: T) => splice(item, newItem);
  return [list, add, splice, replace];
};

type Op<T> = (item: T) => void;
