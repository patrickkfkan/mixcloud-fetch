export const DISCOVER_TAG_FIELDS = `
  fragment DiscoverTagFields on DiscoverTagInterface {
    slug
    name
    __typename
  }
`;

export const TAG_FIELDS = `
  fragment TagFields on Tag {
    slug
    name
    __typename
  }
`;

export const USER_FIELDS = `
  fragment UserFields on User {
    username
    name: displayName
    city
    country,
    about: biog
    url
    id,
    picture {
      urlRoot
      __typename
    }
    coverPicture {
      urlRoot
      __typename
    }
    __typename
  }
`;

export const PLAYLIST_FIELDS = `
  fragment PlaylistFields on Playlist {
    id
    name
    slug
    description
  }
`;

export const CLOUDCAST_FIELDS = `
  fragment CloudcastFields on Cloudcast {
    id
    slug
    name
    url
    description
    publishDate
    isExclusive
    isPlayable
    duration: audioLength
    tags(country: "GLOBAL") {
      tag {
        name
        slug
        __typename
      }
    }
    owner {
      ...UserFields
    }
    picture {
      urlRoot
      __typename
    }
    streams: streamInfo {
      hls: hlsUrl
      dash: dashUrl
      http: url
      __typename
    }
    __typename
  }

  ${USER_FIELDS}
`;
