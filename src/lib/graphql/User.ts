import { USER_FIELDS } from './Fragments.js';
import { GraphQLSearchQueryRecency } from './GraphQL.js';

export const USER_QUERY = `
  query UserProfileHeaderQuery(
    $lookup: UserLookup!
  ) {
    user: userLookup(lookup: $lookup) {
      ...UserFields
      ...UserItemCounts
    }
  }

  ${USER_FIELDS}
  
  fragment UserItemCounts on User {
    streamCount: stream {
      totalCount
    }
    favoriteCount: favorites {
      totalCount
    }
    historyCount: listeningHistory {
      totalCount
    }
    uploadCount: uploads {
      totalCount
    }
    postCount: posts {
      totalCount
    }
    followerCount: followers {
      totalCount
    }
    profileNavigation {
      menuItems {
        ... on PlaylistNavigationItem {
          playlist {
            id
          }
        }
      }
    }
  }
`;

export const SEARCH_USERS_QUERY = `
  query SearchUsersQuery(
    $term: String!
    $userCount: Int
    $cursor: String
    $dateJoinedAfter: DateJoinedAfterFilter
    $isUploader: IsUploaderFilter
  ) {
    viewer {
      search {
        userSearchResults: searchQuery(term: $term) {
          items: users(first: $userCount, after: $cursor, dateJoinedAfter: $dateJoinedAfter, isUploader: $isUploader) {
            edges {
              node {
                ...UserFields
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

  ${USER_FIELDS}
`;

export type UserQueryVariablesOf<T> =
  T extends 'UserQuery' ? UserQueryVariables :
  T extends 'SearchUsersQuery' ? SearchUsersQueryVariables :
  never;

export interface UserQueryVariables {
  lookup: {
    username: string;
  };
}

export interface SearchUsersQueryVariables {
  term: string;
  userCount: number;
  cursor?: string;
  dateJoinedAfter: GraphQLSearchQueryRecency
  isUploader: 'YES' | 'NO' | null
}

const USER_QUERIES = {
  UserQuery: USER_QUERY,
  SearchUsersQuery: SEARCH_USERS_QUERY
};

export const UserGraphQL = {
  getQueries: () => USER_QUERIES
};
