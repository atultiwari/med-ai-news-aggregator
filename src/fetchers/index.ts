export { BaseFetcher, runFetcher } from './base.js';
export { TechUrlsFetcher } from './techurls.js';
export { AiHubTodayFetcher } from './aihubtoday.js';
export { YouTubeFetcher } from './youtube.js';
export { fetchOpmlRss } from './opml-rss.js';

import type { Fetcher } from '../types.js';
import { TechUrlsFetcher } from './techurls.js';
import { AiHubTodayFetcher } from './aihubtoday.js';
import { YouTubeFetcher } from './youtube.js';

export function createAllFetchers(): Fetcher[] {
  return [
    new TechUrlsFetcher(),
    new AiHubTodayFetcher(),
    new YouTubeFetcher(),
  ];
}

