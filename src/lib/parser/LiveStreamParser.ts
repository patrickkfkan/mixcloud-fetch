import { ItemList } from '../entities/ItemList.js';
import { LiveStream } from '../entities/LiveStream.js';
import ObjectHelper from '../utils/ObjectHelper.js';
import BaseParser from './BaseParser.js';

export default class LiveStreamParser extends BaseParser {

  static parseLiveStreamCategories(data: any): string[] {
    const liveCategories = ObjectHelper.getProperty(data, 'data.viewer.liveCategories.music');
    if (!liveCategories) {
      this.throwNoEntryPointError('live stream categories');
    }
    if (Array.isArray(liveCategories)) {
      return liveCategories.reduce<string[]>((result, category) => {
        if (ObjectHelper.hasProperty(category, 'name')) {
          result.push(category.name);
        }
        return result;
      }, []);
    }

    return [];
  }

  static parseLiveStreams(data: any): ItemList<LiveStream> {
    const liveStreams = ObjectHelper.getProperty(data, 'data.viewer.live.currentLiveStreams');
    if (liveStreams) {
      return this.parseList(liveStreams, [ 'liveStream' ]);
    }

    this.throwNoEntryPointError('live streams');
  }
}
