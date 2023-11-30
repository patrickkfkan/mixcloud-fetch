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
    if (user === undefined) {
      this.throwNoEntryPointError('user');
    }
    if (user === null) {
      // User does not exist
      return null;
    }
    return this.parseUserData(user);
  }

  static parseUserUploads(data: any): ItemList<Cloudcast> | null {
    const uploadsByUser = ObjectHelper.getProperty(data, 'data.uploadsByUser');
    if (uploadsByUser === undefined) {
      this.throwNoEntryPointError('user uploads');
    }
    if (uploadsByUser === null) {
      // User does not exist
      return null;
    }
    const items = ObjectHelper.getProperty(uploadsByUser, 'items');
    return this.parseList(items, [ 'cloudcast' ]);
  }

  static parseLiveStream(data: any) {
    const livestream = ObjectHelper.getProperty(data, 'data.user.liveStream');
    if (livestream) {
      return this.parseLiveStreamData(livestream);
    }

    return null;
  }

}
