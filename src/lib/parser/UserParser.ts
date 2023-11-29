import { Cloudcast } from '../entities/Cloudcast.js';
import { ItemList } from '../entities/ItemList.js';
import { User } from '../entities/User.js';
import ObjectHelper from '../utils/ObjectHelper.js';
import BaseParser from './BaseParser.js';

export default class UserParser extends BaseParser {

  static parseUserSearchResults(data: any): ItemList<User> {
    const userSearchResults = ObjectHelper.getProperty(data, 'data.viewer.search.userSearchResults.items');
    if (userSearchResults) {
      return this.parseList(userSearchResults, [ 'user' ]);
    }

    this.throwNoEntryPointError('user search results');
  }

  static parseUser(data: any): User | null {
    const user = ObjectHelper.getProperty(data, 'data.user');
    if (user) {
      return this.parseUserData(user);
    }

    this.throwNoEntryPointError('user');
  }

  static parseUserUploads(data: any): ItemList<Cloudcast> {
    const uploadsByUser = ObjectHelper.getProperty(data, 'data.uploadsByUser.items');
    if (uploadsByUser) {
      return this.parseList(uploadsByUser, [ 'cloudcast' ]);
    }

    this.throwNoEntryPointError('user uploads');
  }

}
