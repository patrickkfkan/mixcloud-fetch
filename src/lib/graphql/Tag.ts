import { DISCOVER_TAG_FIELDS, TAG_FIELDS } from './Fragments.js';
import { GraphQLQueryDiscoverTagsVariable } from './GraphQL.js';

export const TAGS_QUERY = `
  query TagsQuery(
    $discoverTags: [DiscoverTagType]
  ) {
    viewer {
      tags: discover(discoverTags: $discoverTags) {
        selectedTags {
          ...DiscoverTagFields
        }
      }
    }
  }
  ${DISCOVER_TAG_FIELDS}
`;

export const SEARCH_TAGS_QUERY = `
  query SearchTagsQuery(
    $tagCount: Int
    $cursor: String
    $term: String!
  ) {
    viewer {
      search {
        tagSearchResults: searchQuery(term: $term) {
          items: tags(first: $tagCount, after: $cursor) {
            edges {
              node {
                ...TagFields
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    }
  }
  ${TAG_FIELDS}
`;

export type TagQueryVariablesOf<T> =
  T extends 'TagsQuery' ? TagsQueryVariables :
  T extends 'SearchTagsQuery' ? SearchTagsQueryVariables :
  never;

export interface TagsQueryVariables {
  discoverTags: GraphQLQueryDiscoverTagsVariable[]
}

export interface SearchTagsQueryVariables {
  term: string;
  tagCount: number;
  cursor?: string;
}

const TAG_QUERIES = {
  TagsQuery: TAGS_QUERY,
  SearchTagsQuery: SEARCH_TAGS_QUERY
};

export const TagGraphQL = {
  getQueries: () => TAG_QUERIES
};
