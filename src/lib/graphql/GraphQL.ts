import { CloudcastGraphQL, CloudcastQueryVariablesOf } from './Cloudcast.js';
import { PlaylistGraphQL, PlaylistQueryVariablesOf } from './Playlist.js';
import { TagGraphQL, TagQueryVariablesOf } from './Tag.js';
import { UserGraphQL, UserQueryVariablesOf } from './User.js';
import { MiscGraphQL, MiscQueryVariablesOf } from './Misc.js';

export interface GraphQLQueryDiscoverTagsVariable {
  slug: string;
  type: 'TAG';
}

export type GraphQLSearchQueryRecency =
  'PAST_WEEK'|
  'PAST_MONTH' |
  'PAST_YEAR' |
  null; // `null` -> anytime

export const GRAPHQL_QUERY_VARIABLES = {
  DEFAULT_COUNT: 20,
  GLOBAL_COUNTRY: 'GLOBAL',
  MAX_COUNT: 100
};

const GRAPHQL_QUERIES = {
  Misc: { ...MiscGraphQL.getQueries() },
  Cloudcast: { ...CloudcastGraphQL.getQueries() },
  Playlist: { ...PlaylistGraphQL.getQueries() },
  Tag: { ...TagGraphQL.getQueries() },
  User: { ...UserGraphQL.getQueries() }
} as const;

export type GraphQLCategory = keyof typeof GRAPHQL_QUERIES;
export type GraphQLQueryNameOf<T extends GraphQLCategory> = keyof typeof GRAPHQL_QUERIES[T];
export type GraphQLQueryVariablesOf<T extends GraphQLCategory, K> =
  T extends 'Misc' ?
    K extends GraphQLQueryNameOf<T> ? MiscQueryVariablesOf<K> : never :
  T extends 'Cloudcast' ?
    K extends GraphQLQueryNameOf<T> ? CloudcastQueryVariablesOf<K> : never :
  T extends 'Playlist' ?
    K extends GraphQLQueryNameOf<T> ? PlaylistQueryVariablesOf<K> : never :
  T extends 'Tag' ?
    K extends GraphQLQueryNameOf<T> ? TagQueryVariablesOf<K> : never :
  T extends 'User' ?
    K extends GraphQLQueryNameOf<T> ? UserQueryVariablesOf<K> : never :
  never;

export default class GraphQL {
  static getQueries<T extends GraphQLCategory, K extends GraphQLQueryNameOf<T>>(
    category: T,
    queryName: K) {

    return GRAPHQL_QUERIES[category][queryName];
  }
}
