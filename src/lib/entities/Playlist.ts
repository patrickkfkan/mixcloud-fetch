import { User } from './User.js';

export interface Playlist {
  type: 'playlist';
  id: string;
  name: null;
  slug?: string;
  url?: string;
  description?: string;
  owner?: User;
  itemCount?: string;
}
