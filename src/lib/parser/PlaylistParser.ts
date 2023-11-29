import { Cloudcast } from '../entities/Cloudcast.js';
import { ItemList } from '../entities/ItemList.js';
import { Playlist } from '../entities/Playlist.js';
import ObjectHelper from '../utils/ObjectHelper.js';
import BaseParser from './BaseParser.js';

export default class PlaylistParser extends BaseParser {

  static parsePlaylists(data: any): ItemList<Playlist> {
    const playlistsByUser = ObjectHelper.getProperty(data, 'data.playlistsByUser');
    if (playlistsByUser) {
      return this.parsePlaylistsByUser(playlistsByUser);
    }

    this.throwNoEntryPointError('playlists');
  }

  static parsePlaylist(data: any): Playlist | null {
    const playlist = ObjectHelper.getProperty(data, 'data.playlist');
    if (playlist) {
      return this.parsePlaylistData(playlist);
    }

    this.throwNoEntryPointError('playlist');
  }

  static parsePlaylistItems(data: any): ItemList<Cloudcast> {
    const playlistItems = ObjectHelper.getProperty(data, 'data.playlistItems.items');
    if (playlistItems) {
      return this.parseList(playlistItems, [ 'cloudcast' ]);
    }

    this.throwNoEntryPointError('playlist items');
  }

  protected static parsePlaylistsByUser(graph: any): ItemList<Playlist> {
    const userURL = ObjectHelper.getProperty(graph, 'url');
    const profileNavItems = ObjectHelper.getProperty(graph, 'profileNavigation.menuItems');

    if (Array.isArray(profileNavItems)) {
      const playlists = profileNavItems.reduce<Playlist[]>((result, info) => {
        if (ObjectHelper.hasProperty(info, 'playlist') &&
          ObjectHelper.hasProperty(info.playlist, 'id', 'name')) {

          const playlist: Playlist = {
            type: 'playlist',
            id: info.playlist.id,
            name: info.playlist.name,
            slug: info.playlist.slug,
            description: info.playlist.description,
            itemCount: info.count
          };

          if (userURL && playlist.slug) {
            playlist.url = this.constructPlaylistURL(userURL, playlist.slug) || undefined;
          }

          result.push(ObjectHelper.clean(playlist));
        }
        return result;
      }, []);

      return {
        items: playlists
      };
    }

    return {
      items: []
    };
  }

}
