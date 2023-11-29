import { Cloudcast } from '../entities/Cloudcast.js';
import { ItemList } from '../entities/ItemList.js';
import { Tag } from '../entities/Tag.js';
import ObjectHelper from '../utils/ObjectHelper.js';
import BaseParser from './BaseParser.js';

export default class CloudcastParser extends BaseParser {

  static parseCloudcastsByTag(data: any) {
    const cloudcastsByTag = ObjectHelper.getProperty(data, 'data.viewer.cloudcastsByTag');
    if (cloudcastsByTag) {
      return this.#parseCloudcastsByTag(cloudcastsByTag);
    }

    const featuredCloudcastsByTag = ObjectHelper.getProperty(data, 'data.viewer.featuredCloudcastsByTag');
    if (featuredCloudcastsByTag) {
      return this.#parseCloudcastsByTag(featuredCloudcastsByTag);
    }

    this.throwNoEntryPointError('Cloudcasts');
  }

  static parseCloudcastSearchResults(data: any): ItemList<Cloudcast> {
    const cloudcastSearchResults = ObjectHelper.getProperty(data, 'data.viewer.search.cloudcastSearchResults.items');
    if (cloudcastSearchResults) {
      return this.parseList(cloudcastSearchResults, [ 'cloudcast' ]);
    }

    this.throwNoEntryPointError('Cloudcast search results');
  }

  static parseCloudcast(data: any): Cloudcast | null {
    const cloudcast = ObjectHelper.getProperty(data, 'data.cloudcast');
    if (cloudcast) {
      return this.parseCloudcastData(cloudcast);
    }

    this.throwNoEntryPointError('Cloudcast');
  }

  static #parseCloudcastsByTag(graph: any): ItemList<Cloudcast> & { selectedTags: Tag[]; } {
    const selectedTags = ObjectHelper.hasProperty(graph, 'selectedTags') ?
      this.parseDiscoverTagsData(graph.selectedTags) : [];
    const list = ObjectHelper.hasProperty(graph, 'items') ?
      this.parseList(graph.items, [ 'cloudcast' ]) : { items: [] };

    return {
      selectedTags,
      ...list
    };
  }
}
