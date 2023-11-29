import { Cloudcast } from './Cloudcast.js';
import { Playlist } from './Playlist.js';
import { Tag } from './Tag.js';
import { User } from './User.js';

export interface ItemList<T extends Cloudcast | User | Tag | Playlist> {
  items: T[];
  nextPageToken?: string;
}
