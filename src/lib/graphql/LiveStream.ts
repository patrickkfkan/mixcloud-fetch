import { LIVE_STREAM_FIELDS } from './Fragments.js';

/**

Perhaps one day we will implement fetching featured
live streams (requires login?)

fragment FeaturedLive_viewer on Viewer {
  live {
    recommendedLiveStreams(first: $count) {
      edges {
        node {
          __typename
          ... on FeaturedRecommendedLiveStream {
            __typename
            liveStream {
              ...LiveStreamFields
            }
          }
          ... on FollowingRecommendedLiveStream {
            __typename
            liveStream {
              ...LiveStreamFields
            }
          }
          ... on RegularStreamerRecommendedLiveStream {
            __typename
            liveStream {
              ...LiveStreamFields
            }
          }
        }
      }
    }
    id
  }
}

*/

const LIVE_STREAM_CATEGORY_LIST_QUERY = `
  query LiveStreamCategoryListQuery {
    viewer {
      liveCategories {
        music {
          name
        }
      }
    }
  }
`;

const LIVE_STREAM_LIST_QUERY = `
  query LiveStreamListQuery (
    $count: Int!
    $cursor: String
    $orderBy: LiveStreamsOrderByEnum!
    $tag: String
  ) {
    viewer {
      live {
        currentLiveStreams(first: $count, after: $cursor, orderBy: $orderBy, tag: $tag) {
          edges {
            node {
              id
              ...LiveStreamFields
              __typename
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
        id
      }
    }
  }

  ${LIVE_STREAM_FIELDS}
`;

const USER_LIVESTREAM_QUERY = `
  query UserLiveStreamQuery (
    $lookup: UserLookup!
  ) {
    user: userLookup(lookup: $lookup) {
      id
      liveStream(isPublic: false) {
        ...LiveStreamFields
      }
    }
  }

  ${LIVE_STREAM_FIELDS}
`;

export type LiveStreamQueryVariablesOf<T> =
  T extends 'LiveStreamCategoryListQuery' ? LiveStreamCategoryListQueryVariables :
  T extends 'LiveStreamListQuery' ? LiveStreamListQueryVariables :
  T extends 'UserLiveStreamQuery' ? UserLiveStreamQueryVariables :
  never;

export type LiveStreamCategoryListQueryVariables = null

export interface LiveStreamListQueryVariables {
  count: number;
  cursor?: string;
  orderBy: 'CURRENT_SPECTATORS' | 'STARTED_AT';
  tag: string;
}

export interface UserLiveStreamQueryVariables {
  lookup: {
    username: string;
  };
}

const LIVE_STREAM_QUERIES = {
  LiveStreamCategoryListQuery: LIVE_STREAM_CATEGORY_LIST_QUERY,
  LiveStreamListQuery: LIVE_STREAM_LIST_QUERY,
  UserLiveStreamQuery: USER_LIVESTREAM_QUERY
};

export const LiveStreamGraphQL = {
  getQueries: () => LIVE_STREAM_QUERIES
};
