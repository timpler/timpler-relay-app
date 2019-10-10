import { suspensePromise } from './suspendifyPromise';
import { AsyncStorage } from 'react-native';

export function createSuspenseHook<T, A extends any[]>(
  promiseGetter: (...args: A) => Promise<T>,
) {
  const suspendedPromiseGetter = suspensePromise(promiseGetter);
  return function useSuspended(...args: A) {
    const result = suspendedPromiseGetter(...args);

    return result;
  };
}

export const getStoredValue = createSuspenseHook((key: string) =>
  AsyncStorage.getItem(key),
);
