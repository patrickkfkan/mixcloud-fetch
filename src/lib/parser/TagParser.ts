import { ItemList } from '../entities/ItemList.js';
import { Tag } from '../entities/Tag.js';
import ObjectHelper from '../utils/ObjectHelper.js';
import BaseParser from './BaseParser.js';

export default class TagParser extends BaseParser {

  static parseTags(data: any): Tag[] | null {
    const tags = ObjectHelper.getProperty(data, 'data.viewer.tags');
    if (tags === undefined) {
      this.throwNoEntryPointError('tags');
    }
    if (tags === null) {
      // Tags do not exist
      return null;
    }
    const selectedTags = ObjectHelper.getProperty(data, 'data.viewer.tags.selectedTags');
    return this.parseDiscoverTagsData(selectedTags);
  }

  static parseTagSearchResults(data: any): ItemList<Tag> {
    const tagSearchResults = ObjectHelper.getProperty(data, 'data.viewer.search.tagSearchResults.items');
    if (tagSearchResults) {
      return this.parseList(tagSearchResults, [ 'tag' ]);
    }

    this.throwNoEntryPointError('tag search results');
  }
}
