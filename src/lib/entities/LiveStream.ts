import { ImageVariants } from './ImageVariants.js';
import { User } from './User.js';

export interface LiveStream {
  type: 'liveStream';
  id: string;
  name: string;
  description?: string;
  status: string;
  owner?: User;
  plays?: number;
  currentSpectators?: number;
  isUnlisted?: boolean;
  secondaryTags?: LiveStreamSecondaryTag[];
  startedAt?: string;
  scheduledStart?: string | null;
  scheduledEnd?: string | null;
  images?: ImageVariants;
  streams?: {
    hls?: string;
  };
}

export interface LiveStreamSecondaryTag {
  id: string;
  name: string;
}
