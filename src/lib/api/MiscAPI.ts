import MiscParser from '../parser/MiscParser.js';
import BaseAPI from './BaseAPI.js';

export default class MiscAPI extends BaseAPI {

  async getCountries() {
    const data = await this.fetcher.fetchGraphQL('Misc', 'CountryListQuery', null);
    return MiscParser.parseCountries(data);
  }

  async getCategories() {
    const data = await this.fetcher.fetchGraphQL('Misc', 'CategoryListQuery', null);
    return MiscParser.parseCategories(data);
  }
}
