import { ImageVariants } from './ImageVariants.js';
import { Tag } from './Tag.js';
import { User } from './User.js';

export interface Cloudcast {
  type: 'cloudcast';
  id: string;
  name: string;
  slug?: string;
  url?: string;
  description?: string;
  publishDate?: string;
  isExclusive?: boolean;
  isPlayable?: boolean;
  duration?: number;
  tags?: Tag[];
  owner?: User;
  images?: ImageVariants;
  streams?: {
    dash?: string;
    hls?: string;
    http?: string;
  };
}
