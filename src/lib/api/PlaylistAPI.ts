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
    let data;
    try {
      data = await this.fetcher.fetchGraphQL('Playlist', 'PlaylistQuery', {
        playlistID: this.#playlistID
      });
    }
    catch (error) {
      return this.handleFetchByIDError(error, PlaylistParser.parsePlaylist);
    }

    return PlaylistParser.parsePlaylist(data);
  }

  async getShows(params?: PlaylistAPIGetShowsParams) {
    const sanitizedParams = this.sanitizePaginationParams(params);
    let data;
    try {
      data = await this.fetcher.fetchGraphQL('Playlist', 'PlaylistItemsQuery', {
        playlistID: this.#playlistID,
        count: sanitizedParams.limit,
        cursor: sanitizedParams.pageToken
      });
    }
    catch (error) {
      return this.handleFetchByIDError(error, PlaylistParser.parsePlaylistItems);
    }

    const itemList = PlaylistParser.parsePlaylistItems(data);
    if (itemList === null) {
      return null;
    }

    return {
      ...itemList,
      params: sanitizedParams
    };
  }
}
