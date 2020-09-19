export function without<T>(list: T[], ...removals: T[]) {
  return list.filter((item) => !removals.includes(item));
}
