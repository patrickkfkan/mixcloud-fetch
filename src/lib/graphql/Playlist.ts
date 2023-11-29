import { CLOUDCAST_FIELDS, PLAYLIST_FIELDS, USER_FIELDS } from './Fragments.js';

const PLAYLIST_QUERY = `
  query PlaylistQuery(
    $playlistID: ID!
  ) {
    playlist(id: $playlistID) {
      ...PlaylistFields
      owner {
        ...UserFields
      }
      items(first: 0) {
        totalCount
      }
    }
  }

  ${PLAYLIST_FIELDS}
  ${USER_FIELDS}
`;

const PLAYLISTS_BY_USER_QUERY = `
  query PlaylistsByUserQuery(
    $lookup: UserLookup!
  ) {
    playlistsByUser: userLookup(lookup: $lookup) {
      url
      ...Playlists
    }
  }

  fragment Playlists on User {
    profileNavigation {
      menuItems {
        ... on PlaylistNavigationItem {
          count
          playlist {
            ...PlaylistFields
          }
        }
      }
    }
  }

  ${PLAYLIST_FIELDS}
`;

const PLAYLIST_ITEMS_QUERY = `
  query PlaylistItemsQuery(
    $count: Int!
    $cursor: String
    $playlistID: ID!
  ) {
    playlistItems: playlist(id: $playlistID) {
      ...PlaylistItems
    }
  }

  fragment PlaylistItems on Playlist {
    ...PlaylistFields
    owner {
      ...UserFields
    }
    items(first: $count, after: $cursor) {
      totalCount
      edges {
        node {
          cloudcast {
            ...CloudcastFields
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${PLAYLIST_FIELDS}
  ${CLOUDCAST_FIELDS}
`;

export type PlaylistQueryVariablesOf<T> =
  T extends 'PlaylistQuery' ? PlaylistQueryVariables :
  T extends 'PlaylistsByUserQuery' ? PlaylistsByUserQueryVariables :
  T extends 'PlaylistItemsQuery' ? PlaylistItemsQueryVariables :
  never;

export interface PlaylistQueryVariables {
  playlistID: string;
}

export interface PlaylistsByUserQueryVariables {
  lookup: {
    username: string;
  };
}

export interface PlaylistItemsQueryVariables {
  playlistID: string;
  count: number;
  cursor?: string;
}

const PLAYLIST_QUERIES = {
  PlaylistQuery: PLAYLIST_QUERY,
  PlaylistsByUserQuery: PLAYLISTS_BY_USER_QUERY,
  PlaylistItemsQuery: PLAYLIST_ITEMS_QUERY
};

export const PlaylistGraphQL = {
  getQueries: () => PLAYLIST_QUERIES
};
