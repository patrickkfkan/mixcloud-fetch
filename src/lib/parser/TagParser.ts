import { ItemList } from '../entities/ItemList.js';
import { Tag } from '../entities/Tag.js';
import ObjectHelper from '../utils/ObjectHelper.js';
import BaseParser from './BaseParser.js';

export default class TagParser extends BaseParser {

  static parseTags(data: any): Tag[] {
    const tags = ObjectHelper.getProperty(data, 'data.viewer.tags.selectedTags');
    if (tags) {
      return this.parseDiscoverTagsData(tags);
    }

    this.throwNoEntryPointError('tags');
  }

  static parseTagSearchResults(data: any): ItemList<Tag> {
    const tagSearchResults = ObjectHelper.getProperty(data, 'data.viewer.search.tagSearchResults.items');
    if (tagSearchResults) {
      return this.parseList(tagSearchResults, [ 'tag' ]);
    }

    this.throwNoEntryPointError('tag search results');
  }
}
