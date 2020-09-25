/**
 * Gets the value matching the specified key.
 * If no value exists for that key the defaultValue will be set and returned.
 */
export const pull = <K, V>(map: Map<K, V>, key: K, defaultValue: V): V => {
  let value = map.get(key);
  if (!value) {
    value = defaultValue;
    map.set(key, value);
  }
  return value;
};
