import { useQuery, useMutation } from 'relay-hooks';
import {
  OperationType,
  GraphQLTaggedNode,
  MutationConfig,
} from 'relay-runtime';
import { UseQueryProps } from 'relay-hooks/lib/RelayHooksType';

interface QueryHookOptions<T extends OperationType> {
  dataFrom?: UseQueryProps<T>['dataFrom'];
  initialData?: T['response'];
}

export function createQueryHook<T extends OperationType>(
  query: GraphQLTaggedNode,
  defaultOptions?: QueryHookOptions<T>,
) {
  return function useQueryHook(
    variables: T['variables'],
    instanceOptions?: QueryHookOptions<T>,
  ) {
    const finalHookOptions: QueryHookOptions<T> = {
      ...defaultOptions,
      ...instanceOptions,
    };

    const { cached, error, retry, props: data } = useQuery({
      query,
      variables,
      dataFrom: finalHookOptions.dataFrom,
    });

    return [data as T['response'], { cached, error, retry }] as const;
  };
}

type MutationHookConfig<T extends OperationType> = Omit<
  MutationConfig<T>,
  'mutation' | 'variables' | 'onCompleted'
>;

export function createMutationHook<T extends OperationType>(
  query: GraphQLTaggedNode,
  defaultConfig?: MutationHookConfig<T>,
) {
  return function useMutationHook(
    variables: T['variables'],
    instanceConfig?: MutationHookConfig<T>,
  ) {
    const instanceFinalConfig: MutationHookConfig<T> = {
      ...defaultConfig,
      ...instanceConfig,
    };

    const [mutate, mutationState] = useMutation<T>(query, {
      variables,
      ...instanceFinalConfig,
    });

    return [mutate, mutationState] as const;
  };
}
