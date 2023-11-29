import { ImageVariants } from './ImageVariants.js';

export interface User {
  type: 'user';
  id: string;
  username: string;
  name?: string;
  city?: string;
  country?: string;
  about?: string;
  url?: string;
  images?: ImageVariants;
  coverImage?: string;
  counts?: {
    streams?: number;
    favorites?: number;
    playlists?: number;
    history?: number;
    uploads?: number;
    posts?: number;
    followers?: number;
  };
}
