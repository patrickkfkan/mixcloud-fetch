import { default as main } from './index.js';
import * as mcfetch from './index.js';

export = Object.assign(main, { ...mcfetch });
