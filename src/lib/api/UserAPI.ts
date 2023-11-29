import { UserUploadsQueryVariables } from '../graphql/Cloudcast.js';
import PlaylistParser from '../parser/PlaylistParser.js';
import UserParser from '../parser/UserParser.js';
import Fetcher from '../utils/Fetcher.js';
import BaseAPI, { APIPaginationParams } from './BaseAPI.js';

const SHOW_ORDER_VALUES: NonNullable<UserAPIGetShowsParams['orderBy']>[] = [ 'trending', 'popular', 'latest', 'oldest' ];
const SHOW_ORDER_GRAPHQL_MAP: Record<NonNullable<UserAPIGetShowsParams['orderBy']>, UserUploadsQueryVariables['orderBy']> = {
  trending: 'HOT',
  popular: 'POPULAR',
  latest: 'LATEST',
  oldest: 'OLDEST'
};

export interface UserAPIGetShowsParams extends APIPaginationParams {
  orderBy?: 'trending' | 'popular' | 'latest' | 'oldest';
}

export default class UserAPI extends BaseAPI {

  #username: string;

  /**
   * @internal
   *
   * @param username
   * @param fetcher
   */
  constructor(username: string, fetcher: Fetcher) {
    super(fetcher);
    this.#username = username;
  }

  async getInfo() {
    const data = await this.fetcher.fetchGraphQL('User', 'UserQuery', {
      lookup: { username: this.#username }
    });
    return UserParser.parseUser(data);
  }

  async getPlaylists() {
    const data = await this.fetcher.fetchGraphQL('Playlist', 'PlaylistsByUserQuery', {
      lookup: { username: this.#username }
    });
    return PlaylistParser.parsePlaylists(data);
  }

  async getShows(params?: UserAPIGetShowsParams) {
    const sanitizedParams = {
      ...this.sanitizePaginationParams(params),
      orderBy: this.sanitizeFromArray(params?.orderBy, SHOW_ORDER_VALUES, 'latest')
    };

    const data = await this.fetcher.fetchGraphQL('Cloudcast', 'UserUploadsQuery', {
      lookup: { username: this.#username },
      count: sanitizedParams.limit,
      cursor: sanitizedParams.pageToken,
      orderBy: this.mapToGraphQLVariable(sanitizedParams.orderBy, SHOW_ORDER_GRAPHQL_MAP)
    });

    return {
      ...UserParser.parseUserUploads(data),
      params: sanitizedParams
    };
  }

}
