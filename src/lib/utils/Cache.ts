import NodeCache from 'node-cache';

export default class Cache {
  #ttl: number;
  #maxEntries: number;
  #cache: NodeCache;

  constructor(ttl: number, maxEntries: number) {
    this.#ttl = ttl;
    this.#maxEntries = maxEntries;
    this.#cache = new NodeCache({
      checkperiod: 600
    });
  }

  setTTL(ttl: number) {
    if (this.#ttl !== ttl) {
      this.getKeys().forEach((key) => {
        this.#cache.ttl(key, ttl);
      });
      this.#ttl = ttl;
    }
  }

  setMaxEntries(maxEntries: number) {
    this.reduceEntries(maxEntries);
    this.#maxEntries = maxEntries;
  }

  getMaxEntries() {
    return this.#maxEntries;
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key);
  }

  put<T>(key: string, value: T) {
    const maxEntries = this.getMaxEntries();
    if (maxEntries === 0) {
      return false;
    }
    else if (maxEntries > 0) {
      this.reduceEntries(maxEntries - 1);
    }
    return this.#cache.set(key, value, this.#ttl);
  }

  reduceEntries(reduceTo?: number) {
    if (reduceTo === undefined) {
      reduceTo = this.getMaxEntries();
    }
    const keys = this.getKeys();
    if (keys.length > reduceTo) {
      for (let i = 0; i < keys.length - reduceTo; i++) {
        this.#cache.del(keys[i]);
      }
    }
  }

  getKeys(): string[] {
    return this.#cache.keys();
  }

  clear() {
    this.#cache.flushAll();
  }

  async getOrSet<T>(key: string, promiseCallback: () => Promise<T>): Promise<T> {
    const cachedValue = this.get<T>(key);
    if (cachedValue !== undefined) {
      return cachedValue;
    }
    const value = await promiseCallback();
    this.put<T>(key, value);
    return value;
  }
}
