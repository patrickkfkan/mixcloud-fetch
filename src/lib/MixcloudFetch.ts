import Bottleneck from 'bottleneck';
import CloudcastAPI from './api/CloudcastAPI.js';
import PlaylistAPI from './api/PlaylistAPI.js';
import SearchAPI from './api/SearchAPI.js';
import TagAPI from './api/TagAPI.js';
import UserAPI from './api/UserAPI.js';
import Cache from './utils/Cache.js';
import Fetcher from './utils/Fetcher.js';
import Limiter from './utils/Limiter.js';
import MiscAPI from './api/MiscAPI.js';
import LiveStreamAPI from './api/LiveStreamAPI.js';

const DEFAULT_CACHE_TTL = 300;
const DEFAULT_CACHE_MAX_ENTRIES = 10;

export default class MixcloudFetch {

  #cache: Cache;
  #fetcher: Fetcher;
  #limiter: Limiter;
  #miscAPI: MiscAPI;
  #liveStreamAPI: LiveStreamAPI;

  constructor() {
    this.#cache = new Cache(DEFAULT_CACHE_TTL, DEFAULT_CACHE_MAX_ENTRIES);
    this.#limiter = new Limiter();
    this.#fetcher = new Fetcher({
      cache: this.#cache,
      limiter: this.#limiter
    });
    this.#miscAPI = new MiscAPI(this.#fetcher);
    this.#liveStreamAPI = new LiveStreamAPI(this.#fetcher);
  }

  cloudcast(cloudcastID: string) {
    return new CloudcastAPI(cloudcastID, this.#fetcher);
  }

  playlist(playlistID: string) {
    return new PlaylistAPI(playlistID, this.#fetcher);
  }

  search(keywords: string) {
    return new SearchAPI(keywords, this.#fetcher);
  }

  tag(slugs: string | string[]) {
    return new TagAPI(slugs, this.#fetcher);
  }

  user(username: string) {
    return new UserAPI(username, this.#fetcher);
  }

  get misc() {
    return this.#miscAPI;
  }

  get liveStream() {
    return this.#liveStreamAPI;
  }

  get cache(): ICache {
    return this.#cache;
  }

  get limiter(): ILimiter {
    return this.#limiter;
  }
}

export interface ICache {
  clear: () => void;
  setTTL: (ttl: number) => void;
  setMaxEntries: (maxEntries: number) => void;
}

export interface ILimiter {
  setOptions: (options?: Bottleneck.ConstructorOptions) => void;
  setEnabled: (value: boolean) => void;
  isEnabled: () => boolean;
}
