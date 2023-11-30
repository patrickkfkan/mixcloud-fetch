import CloudcastParser from '../parser/CloudcastParser.js';
import Fetcher from '../utils/Fetcher.js';
import BaseAPI from './BaseAPI.js';

export default class CloudcastAPI extends BaseAPI {

  #cloudcastID: string;

  /**
   * @internal
   *
   * @param cloudcastID
   * @param fetcher
   */
  constructor(cloudcastID: string, fetcher: Fetcher) {
    super(fetcher);
    this.#cloudcastID = cloudcastID;
  }

  async getInfo() {
    let data;
    try {
      data = await this.fetcher.fetchGraphQL('Cloudcast', 'CloudcastQuery', {
        cloudcastId: this.#cloudcastID
      });
    }
    catch (error) {
      return this.handleFetchByIDError(error, CloudcastParser.parseCloudcast);
    }

    return CloudcastParser.parseCloudcast(data);
  }
}
