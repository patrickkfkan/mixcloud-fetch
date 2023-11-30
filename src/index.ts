import MixcloudFetch from './lib/MixcloudFetch.js';

export { default as MixcloudFetch } from './lib/MixcloudFetch.js';
export { default as CloudcastAPI } from './lib/api/CloudcastAPI.js';
export { default as PlaylistAPI } from './lib/api/PlaylistAPI.js';
export { default as SearchAPI } from './lib/api/SearchAPI.js';
export { default as TagAPI } from './lib/api/TagAPI.js';
export { default as UserAPI } from './lib/api/UserAPI.js';
export { default as LiveStreamAPI } from './lib/api/LiveStreamAPI.js';

export * from './lib/MixcloudFetch.js';

export * from './lib/api/BaseAPI.js';
export * from './lib/api/CloudcastAPI.js';
export * from './lib/api/PlaylistAPI.js';
export * from './lib/api/SearchAPI.js';
export * from './lib/api/TagAPI.js';
export * from './lib/api/UserAPI.js';
export * from './lib/api/LiveStreamAPI.js';

export * from './lib/entities/Cloudcast.js';
export * from './lib/entities/ImageVariants.js';
export * from './lib/entities/ItemList.js';
export * from './lib/entities/Misc.js';
export * from './lib/entities/Playlist.js';
export * from './lib/entities/Tag.js';
export * from './lib/entities/User.js';

export default new MixcloudFetch();
