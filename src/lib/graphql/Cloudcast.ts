import { CLOUDCAST_FIELDS, DISCOVER_TAG_FIELDS } from './Fragments.js';
import { GraphQLQueryDiscoverTagsVariable, GraphQLSearchQueryRecency } from './GraphQL.js';

const CLOUDCAST_QUERY = `
  query CloudcastQuery(
    $cloudcastId: ID!
  ) {
    cloudcast(id: $cloudcastId) {
      ...CloudcastFields
    }
  }
  ${CLOUDCAST_FIELDS}
`;

const CLOUDCASTS_BY_TAG_QUERY = `
  query CloudcastsByTagQuery(
    $count: Int!
    $cursor: String
    $discoverTags: [DiscoverTagType]
    $orderBy: DiscoverOrderByEnum
    $country: String
  ) {
    viewer {
      cloudcastsByTag: discover(discoverTags: $discoverTags, country: $country) {
        selectedTags {
          ...DiscoverTagFields
        }
        items: shows(first: $count, after: $cursor, orderBy: $orderBy) {
          edges {
            node {
              ...CloudcastFields
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
  ${DISCOVER_TAG_FIELDS}
  ${CLOUDCAST_FIELDS}
`;

const FEATURED_CLOUDCASTS_BY_TAG_QUERY = `
  query StaffPicksQuery(
    $discoverTags: [DiscoverTagType]
    $count: Int!
    $cursor: String
    $orderBy: DiscoverOrderByEnum
  ) {
    viewer {
      featuredCloudcastsByTag: discover(discoverTags: $discoverTags) {
        selectedTags {
          ...DiscoverTagFields
        }
        items: staffPicks(first: $count, after: $cursor, orderBy: $orderBy) {
          edges {
            node {
              ...CloudcastFields
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
  ${DISCOVER_TAG_FIELDS}
  ${CLOUDCAST_FIELDS}
`;

const USER_UPLOADS_QUERY = `
  query UserUploadsQuery(
    $count: Int!
    $cursor: String
    $lookup: UserLookup!
    $orderBy: CloudcastOrderByEnum
  ) {
    uploadsByUser: userLookup(lookup: $lookup) {
      ...UserFields
      items: uploads(first: $count, after: $cursor, orderBy: $orderBy) {
        edges {
          node {
            ...CloudcastFields
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  ${CLOUDCAST_FIELDS}
`;

const SEARCH_CLOUDCASTS_QUERY = `
  query SearchCloudcastsQuery(
    $term: String!
    $cloudcastCount: Int
    $cursor: String
    $createdAfter: CreatedAfterFilter
    $isTimestamped: IsTimestampedFilter
  ) {
    viewer {
      search {
        cloudcastSearchResults: searchQuery(term: $term) {
          items: cloudcasts(first: $cloudcastCount, after: $cursor, createdAfter: $createdAfter, isTimestamped: $isTimestamped) {
            edges {
              node {
                ...CloudcastFields
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

  ${CLOUDCAST_FIELDS}
`;

export type CloudcastQueryVariablesOf<T> =
  T extends 'CloudcastQuery' ? CloudcastQueryVariables :
  T extends 'CloudcastsByTagQuery' ? CloudcastsByTagQueryVariables :
  T extends 'FeaturedCloudcastsByTagQuery' ? FeaturedCloudcastsByTagQueryVariables :
  T extends 'UserUploadsQuery' ? UserUploadsQueryVariables :
  T extends 'SearchCloudcastsQuery' ? SearchCloudcastsQueryVariables :
  never;

export interface CloudcastQueryVariables {
  cloudcastId: string;
}

export interface CloudcastsByTagQueryVariables {
  discoverTags: GraphQLQueryDiscoverTagsVariable[];
  count: number;
  cursor?: string;
  orderBy: 'POPULAR' | 'LATEST' | null; // `null` -> Trending
  country: string;
}

export interface FeaturedCloudcastsByTagQueryVariables {
  discoverTags: GraphQLQueryDiscoverTagsVariable[];
  count: number;
  cursor?: string;
  orderBy: 'POPULAR' | 'LATEST';
}

export interface UserUploadsQueryVariables {
  lookup: {
    username: string;
  }
  count: number;
  cursor?: string;
  orderBy: 'HOT'| 'POPULAR' | 'LATEST' | 'OLDEST';
}

export interface SearchCloudcastsQueryVariables {
  term: string;
  cloudcastCount: number;
  cursor?: string;
  createdAfter: GraphQLSearchQueryRecency
  isTimestamped: 'YES' | null
}

const CLOUDCAST_QUERIES = {
  CloudcastQuery: CLOUDCAST_QUERY,
  CloudcastsByTagQuery: CLOUDCASTS_BY_TAG_QUERY,
  FeaturedCloudcastsByTagQuery: FEATURED_CLOUDCASTS_BY_TAG_QUERY,
  UserUploadsQuery: USER_UPLOADS_QUERY,
  SearchCloudcastsQuery: SEARCH_CLOUDCASTS_QUERY
};

export const CloudcastGraphQL = {
  getQueries: () => CLOUDCAST_QUERIES
};
