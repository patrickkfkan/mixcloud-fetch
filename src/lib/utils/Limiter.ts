import Bottleneck from 'bottleneck';

export default class Limiter {

  #limiter: Bottleneck;
  #enabled: boolean;

  constructor() {
    this.#limiter = new Bottleneck({
      maxConcurrent: 5,
      minTime: 200
    });
    this.#enabled = true;
  }

  setOptions(options?: Bottleneck.ConstructorOptions) {
    this.#limiter.updateSettings(options);
  }

  setEnabled(value: boolean) {
    this.#enabled = value;
  }

  isEnabled() {
    return this.#enabled;
  }

  schedule<R>(fn: () => Promise<R>): Promise<R> {
    if (this.#enabled) {
      return this.#limiter.schedule(fn);
    }
    return fn();
  }
}
