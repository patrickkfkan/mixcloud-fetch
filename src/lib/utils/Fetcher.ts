import fetch, { Request } from 'node-fetch';
import Cache from './Cache.js';
import GraphQL, { GraphQLCategory, GraphQLQueryNameOf, GraphQLQueryVariablesOf } from '../graphql/GraphQL.js';
import Limiter from './Limiter.js';

const GRAPHQL_URL = 'https://app.mixcloud.com/graphql';

export interface FetcherParams {
  cache: Cache;
  limiter: Limiter;
}

export default class Fetcher {

  #cache: Cache;
  #limiter: Limiter;

  constructor(params: FetcherParams) {
    this.#cache = params.cache;
    this.#limiter = params.limiter;
  }

  async fetchGraphQL<T extends GraphQLCategory, K extends GraphQLQueryNameOf<T>>(
    category: T,
    queryName: K,
    variables: GraphQLQueryVariablesOf<T, K>) {

    const query = GraphQL.getQueries(category, queryName);
    const payload = variables ? { query, variables } : { query };

    return this.#cache.getOrSet(getCacheKeyForGraphQLRequest(payload), async () => {
      const request = new Request(GRAPHQL_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'}
      });

      const json = await this.#limiter.schedule(async () => {
        const response = await fetch(request);
        if (!response.ok) {
          throw Error(`Bad response: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      });

      if (json.errors) {
        const e = json.errors[0];
        if (typeof e === 'object') {
          const ePath = Array.isArray(e.path) ? e.path.join('.') : '';
          const eMessage = e.message;
          const parts: string[] = [];
          if (ePath) {
            parts.push(ePath);
          }
          if (eMessage) {
            parts.push(eMessage);
          }
          if (parts.length > 0) {
            throw Error(parts.join(': '));
          }
        }
        throw Error(e);
      }

      return json;
    });
  }
}

function getCacheKeyForGraphQLRequest(payload: Record<string, any>): string {
  return `${GRAPHQL_URL}:graphql:${JSON.stringify(payload)}`;
}
