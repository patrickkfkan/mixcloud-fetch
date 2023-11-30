import { Cloudcast } from './Cloudcast.js';
import { LiveStream } from './LiveStream.js';
import { Playlist } from './Playlist.js';
import { Tag } from './Tag.js';
import { User } from './User.js';

export type ItemListItem = Cloudcast | User | Tag | Playlist | LiveStream;

export interface ItemList<T extends ItemListItem> {
  items: T[];
  nextPageToken?: string;
}
