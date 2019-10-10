export function getSafely<T>(getter: () => T, fallback: T) {
  try {
    return getter();
  } catch (error) {
    return fallback;
  }
}
