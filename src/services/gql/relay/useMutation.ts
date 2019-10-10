import { commitMutation } from 'react-relay';
import {
  OperationType,
  GraphQLTaggedNode,
  PayloadError,
  MutationConfig,
  Disposable,
} from 'relay-runtime';
import { useState, useRef } from 'react';

type MutationHookConfig<T extends OperationType> = MutationConfig<T>;

export function _createMutationHook<T extends OperationType>(
  mutation: GraphQLTaggedNode,
  config?: MutationHookConfig<T>,
) {
  console.log(config);
  const environment: any = null;

  return function useMutation() {
    const [isExecuting, setIsExecuting] = useState(false);
    const [executionErrors, setExecutionErrors] = useState<ReadonlyArray<
      PayloadError
    > | null>(null);

    const currentMutationDisposerRef = useRef<Disposable | null>(null);

    function disposeCurrent() {
      if (currentMutationDisposerRef.current) {
        currentMutationDisposerRef.current.dispose();
        return true;
      }

      return false;
    }

    async function executeMutation(variables: T['variables']) {
      return new Promise<T['response']>((resolve) => {
        setIsExecuting(true);
        const disposer = commitMutation<T>(environment, {
          mutation,
          variables,
          onCompleted: (response, error) => {
            currentMutationDisposerRef.current = null;
            if (error) {
              setExecutionErrors(error);
              return;
            } else {
              setExecutionErrors(null);
            }

            resolve(response);
            setIsExecuting(false);
          },
        });

        currentMutationDisposerRef.current = disposer;
      });
    }

    return [
      executeMutation,
      { isExecuting, executionErrors, disposeCurrent },
    ] as const;
  };
}
