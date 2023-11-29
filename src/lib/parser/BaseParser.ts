import base64Min from 'base64-min';
import { Cloudcast } from '../entities/Cloudcast.js';
import { ImageVariants } from '../entities/ImageVariants.js';
import { ItemList } from '../entities/ItemList.js';
import { Playlist } from '../entities/Playlist.js';
import { Tag } from '../entities/Tag.js';
import { User } from '../entities/User.js';
import ObjectHelper from '../utils/ObjectHelper.js';

// https://github.com/ytdl-org/youtube-dl/blob/master/youtube_dl/extractor/mixcloud.py
const DECRYPTION_KEY = 'IFYOUWANTTHEARTISTSTOGETPAIDDONOTDOWNLOADFROMMIXCLOUD';

// Based on API fetch results
const GENERAL_IMAGE_URLS: ImageVariants = {
  medium: 'https://thumbnailer.mixcloud.com/unsafe/100x100/',
  '768wx768h': 'https://thumbnailer.mixcloud.com/unsafe/768x768/',
  '320wx320h': 'https://thumbnailer.mixcloud.com/unsafe/320x320/',
  extra_large: 'https://thumbnailer.mixcloud.com/unsafe/600x600/',
  large: 'https://thumbnailer.mixcloud.com/unsafe/300x300/',
  '640wx640h': 'https://thumbnailer.mixcloud.com/unsafe/640x640/',
  medium_mobile: 'https://thumbnailer.mixcloud.com/unsafe/80x80/',
  small: 'https://thumbnailer.mixcloud.com/unsafe/25x25/',
  '1024wx1024h': 'https://thumbnailer.mixcloud.com/unsafe/1024x1024/',
  thumbnail: 'https://thumbnailer.mixcloud.com/unsafe/50x50/'
};

const COVER_IMAGE_URL = 'https://thumbnailer.mixcloud.com/unsafe/1460x370/';

type ItemListFilterType = (Cloudcast | User | Tag | Playlist)['type'];
type ItemListItemOf<T extends ItemListFilterType> =
  T extends 'cloudcast' ? Cloudcast :
  T extends 'user' ? User :
  T extends 'tag' ? Tag :
  T extends 'playlist' ? Playlist :
  never;
type ItemListOf<T extends ItemListFilterType[]> = ItemList<ItemListItemOf<T[number]>>;

export default abstract class BaseParser {

  protected static parseDiscoverTagsData(data: any): Tag[] {
    if (Array.isArray(data)) {
      return data.reduce<Tag[]>((result, t) => {
        if (ObjectHelper.getProperty(t, '__typename') === 'DiscoverTagTag') {
          const parsed = this.parseTagData(t);
          if (parsed) {
            result.push(parsed);
          }
        }
        return result;
      }, []);
    }

    return [];

  }

  protected static parseTagData(data: any): Tag | null {
    if (!ObjectHelper.hasProperty(data, 'name', 'slug')) {
      return null;
    }
    return {
      type: 'tag',
      name: data.name,
      slug: data.slug
    };
  }

  protected static parseList<T extends ItemListFilterType[]>(data: any, filterTypes?: T): ItemListOf<T> {

    if (!ObjectHelper.hasProperty(data, 'edges') || !Array.isArray(data.edges)) {
      return {
        items: []
      };
    }

    const _filterTypes = filterTypes || [ 'cloudcast', 'tag', 'user', 'playlist' ] as T;

    const dataEdges = data.edges;
    const nodes = dataEdges.reduce<any[]>((result, edge) => {
      if (ObjectHelper.hasProperty(edge, 'node') && edge.node) {
        result.push(edge.node);
      }
      return result;
    }, []);

    const listItems = nodes.reduce<ItemListItemOf<T[number]>[]>((result, node) => {
      const typeName = ObjectHelper.getProperty(node, '__typename');
      let parsedItem;
      switch (typeName) {
        case 'Cloudcast':
          parsedItem = this.parseCloudcastData(node);
          break;
        case 'User':
          parsedItem = this.parseUserData(node);
          break;
        case 'Tag':
          parsedItem = this.parseTagData(node);
          break;
        default:
          if (ObjectHelper.getProperty(node, 'cloudcast.__typename') === 'Cloudcast') {
            parsedItem = this.parseCloudcastData(node.cloudcast);
          }
          else {
            parsedItem = null;
          }
      }

      if (parsedItem && this.itemMatchesListFilterType(parsedItem, _filterTypes)) {
        result.push(parsedItem);
      }

      return result;
    }, []);

    const list: ItemListOf<T> = {
      items: listItems
    };

    if (ObjectHelper.hasProperty(data, 'pageInfo')) {
      const hasNextPage = ObjectHelper.getProperty(data.pageInfo, 'hasNextPage');
      const endCursor = ObjectHelper.getProperty(data.pageInfo, 'endCursor');
      if (hasNextPage && endCursor) {
        list.nextPageToken = endCursor;
      }
    }

    return list;
  }

  protected static itemMatchesListFilterType<T extends ItemListFilterType[]>(item: Cloudcast | User | Tag | Playlist, filterTypes: T): item is ItemListItemOf<T[number]> {
    return filterTypes.includes(item.type);
  }

  protected static parseCloudcastData(data: any): Cloudcast | null {

    if (!ObjectHelper.hasProperty(data, 'id', 'name')) {
      return null;
    }

    const cloudcast: Cloudcast = {
      type: 'cloudcast',
      id: data.id,
      name: data.name,
      slug: data.slug,
      url: data.url,
      description: data.description,
      publishDate: data.publishDate,
      isExclusive: ObjectHelper.hasProperty(data, 'isExclusive') ? data.isExclusive : undefined,
      isPlayable: ObjectHelper.hasProperty(data, 'isPlayable') ? data.isPlayable : undefined,
      duration: ObjectHelper.hasProperty(data, 'duration') ? data.duration : undefined
    };

    const dataTags = data.tags;
    if (Array.isArray(dataTags)) {
      cloudcast.tags = dataTags.reduce<Tag[]>((result, t) => {
        if (ObjectHelper.getProperty(t, 'tag.__typename') === 'Tag') {
          const tag = this.parseTagData(t.tag);
          if (tag) {
            result.push(tag);
          }
        }
        return result;
      }, []);
    }

    if (ObjectHelper.getProperty(data, 'owner.__typename') === 'User') {
      cloudcast.owner = this.parseUserData(data.owner) || undefined;
    }

    if (ObjectHelper.getProperty(data, 'picture.__typename') === 'Picture') {
      cloudcast.images = this.parsePicture(data.picture) || undefined;
    }

    if (ObjectHelper.getProperty(data, 'streams.__typename') === 'StreamInfo') {
      cloudcast.streams = this.parseStreams(data.streams) || undefined;
    }

    return ObjectHelper.clean(cloudcast);
  }

  protected static parseUserData(data: any): User | null {
    if (!ObjectHelper.hasProperty(data, 'id', 'username')) {
      return null;
    }

    const user: User = {
      type: 'user',
      id: data.id,
      username: data.username,
      name: data.name,
      city: data.city,
      country: data.country,
      about: data.about,
      url: data.url
    };

    const __getCountValue = (data: any) =>
      ObjectHelper.hasProperty(data, 'totalCount') ? data.totalCount : data;

    const counts = ObjectHelper.clean({
      streams: __getCountValue(data.streams),
      favorites: __getCountValue(data.favorites),
      history: __getCountValue(data.history),
      uploads: __getCountValue(data.uploads),
      posts: __getCountValue(data.posts),
      followers: __getCountValue(data.followers)
    });
    if (Object.keys(counts).length > 0) {
      user.counts = counts;
    }

    if (user.counts) {
      const profileNavItems = ObjectHelper.getProperty(data, 'profileNavigation.menuItems');
      if (Array.isArray(profileNavItems)) {
        user.counts.playlists = profileNavItems.filter((nav) => nav.playlist).length;
      }
    }

    if (ObjectHelper.getProperty(data, 'picture.__typename') === 'Picture') {
      user.images = this.parsePicture(data.picture) || undefined;
    }

    if (ObjectHelper.getProperty(data, 'coverPicture.__typename') === 'Picture') {
      user.coverImage = this.parseCoverPicture(data.coverPicture) || undefined;
    }

    return ObjectHelper.clean(user);
  }

  protected static parsePlaylistData(data: any): Playlist | null {
    if (!ObjectHelper.hasProperty(data, 'id', 'name')) {
      return null;
    }

    const playlist: Playlist = {
      type: 'playlist',
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description
    };

    if (ObjectHelper.getProperty(data, 'owner.__typename') === 'User') {
      playlist.owner = this.parseUserData(data.owner) || undefined;
    }

    if (playlist.owner?.url && playlist.slug) {
      playlist.url = this.constructPlaylistURL(playlist.owner.url, playlist.slug) || undefined;
    }

    playlist.itemCount = ObjectHelper.getProperty(data, 'items.totalCount') || 0;

    return ObjectHelper.clean(playlist);
  }

  protected static constructPlaylistURL(userURL: string, playlistSlug: string): string | null {
    if (userURL && playlistSlug) {
      return `${userURL}playlists/${playlistSlug}/`;
    }

    return null;

  }

  protected static parsePicture(data: any): ImageVariants | null {
    // Mixcloud constructs the full image URL in client-side JS. It would be more efficient
    // To just prepend known URLs to urlRoot here...
    if (ObjectHelper.hasProperty(data, 'urlRoot')) {
      const images: Partial<ImageVariants> = {};
      for (const [ size, url ] of Object.entries(GENERAL_IMAGE_URLS)) {
        images[size as keyof ImageVariants] = url + data.urlRoot;
      }
      return images as ImageVariants;
    }
    return null;
  }

  protected static parseCoverPicture(data: any): string | null {
    if (ObjectHelper.hasProperty(data, 'urlRoot')) {
      return COVER_IMAGE_URL + data.urlRoot;
    }

    return null;
  }

  protected static parseStreams(data: any): Cloudcast['streams'] | null {
    const dash = ObjectHelper.getProperty(data, 'dash');
    const hls = ObjectHelper.getProperty(data, 'hls');
    const http = ObjectHelper.getProperty(data, 'http');

    if (!dash && !hls && !http) {
      return null;
    }

    const streams = {
      dash: dash ? base64Min.decodeWithKey(dash, DECRYPTION_KEY) : undefined,
      hls: hls ? base64Min.decodeWithKey(hls, DECRYPTION_KEY) : undefined,
      http: http ? base64Min.decodeWithKey(http, DECRYPTION_KEY) : undefined
    };

    return ObjectHelper.clean(streams);
  }

  protected static throwNoEntryPointError(parseTargetName: string): never {
    throw Error(`Failed to parse ${parseTargetName}: no entry point found in data.`);
  }
}
