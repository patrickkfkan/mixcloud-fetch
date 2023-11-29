import PlaylistParser from '../parser/PlaylistParser.js';
import Fetcher from '../utils/Fetcher.js';
import BaseAPI, { APIPaginationParams } from './BaseAPI.js';

export type PlaylistAPIGetShowsParams = APIPaginationParams;

export default class PlaylistAPI extends BaseAPI {

  #playlistID: string;

  /**
   * @internal
   *
   * @param playlistID
   * @param fetcher
   */
  constructor(playlistID: string, fetcher: Fetcher) {
    super(fetcher);
    this.#playlistID = playlistID;
  }

  async getInfo() {
    const data = await this.fetcher.fetchGraphQL('Playlist', 'PlaylistQuery', {
      playlistID: this.#playlistID
    });
    return PlaylistParser.parsePlaylist(data);
  }

  async getShows(params?: PlaylistAPIGetShowsParams) {
    const page = this.sanitizePaginationParams(params);
    const data = await this.fetcher.fetchGraphQL('Playlist', 'PlaylistItemsQuery', {
      playlistID: this.#playlistID,
      count: page.limit,
      cursor: page.pageToken
    });
    return PlaylistParser.parsePlaylistItems(data);
  }
}
