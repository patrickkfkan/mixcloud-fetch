import { GRAPHQL_QUERY_VARIABLES } from '../graphql/GraphQL.js';
import Fetcher, { FetcherGraphQLResultError } from '../utils/Fetcher.js';
import ObjectHelper from '../utils/ObjectHelper.js';

export interface APIPaginationParams {
  limit?: number;
  pageToken?: string | null;
}

export const API_PARAMS_MAX_LIMIT = GRAPHQL_QUERY_VARIABLES.MAX_COUNT;
export const API_PARAMS_DEFAULT_LIMIT = GRAPHQL_QUERY_VARIABLES.DEFAULT_COUNT;
export const API_PARAMS_GLOBAL_COUNTRY = GRAPHQL_QUERY_VARIABLES.GLOBAL_COUNTRY;

export default abstract class BaseAPI {

  /**
   * @internal
   */
  protected fetcher: Fetcher;

  /**
   * @internal
   * @param fetcher
   */
  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher;
  }

  /**
   * @internal
   *
   * @param params
   * @returns
   */
  protected sanitizePaginationParams(params?: APIPaginationParams) {
    return ObjectHelper.clean({
      limit: params?.limit !== undefined ?
        Math.min(params.limit, API_PARAMS_MAX_LIMIT) : API_PARAMS_DEFAULT_LIMIT,
      pageToken: params?.pageToken || undefined
    });
  }

  /**
   * @internal
   *
   * @param value
   * @param validValues
   * @param defaultValue
   * @returns
   */
  protected sanitizeFromArray<T>(value: string | undefined, validValues: T[], defaultValue: T): T {
    return validValues.includes(value as any) ? value as T : defaultValue;
  }

  /**
   * @internal
   *
   * @param value
   * @param map
   * @returns
   */
  protected mapToGraphQLVariable<T extends string | number | symbol, K>(value: T, map: Record<T, K>) {
    return map[value];
  }

  /**
   * @internal
   *
   * @param error
   * @param tryParseFn
   * @returns
   */
  protected handleFetchByIDError<T>(error: any, tryParseFn: (data: any) => T | null) {
    if (error instanceof FetcherGraphQLResultError) {
      try {
        /**
         * Error.json should contain the the GraphQL result even
         * if ID was invalid. Confirm if we can parse it and get a
         * `null` result.
         */
        const tryParse = tryParseFn(error.json);
        if (tryParse === null) {
          // `error` thrown because ID was invalid, i.e. item does not exist.
          return null;
        }
      }
      catch (tryParseError) {
        throw error;
      }
    }
    throw error;
  }

}
