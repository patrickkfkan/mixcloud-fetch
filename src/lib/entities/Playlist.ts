import { User } from './User.js';

export interface Playlist {
  type: 'playlist';
  id: string;
  name: string;
  slug?: string;
  url?: string;
  description?: string;
  owner?: User;
  itemCount?: string;
}
