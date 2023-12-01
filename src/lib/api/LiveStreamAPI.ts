import { LiveStreamListQueryVariables } from '../graphql/LiveStream.js';
import LiveStreamParser from '../parser/LiveStreamParser.js';
import BaseAPI, { APIPaginationParams } from './BaseAPI.js';

const CURRENT_ORDER_VALUES: NonNullable<LiveStreamAPIGetCurrentParams['orderBy']>[] = [ 'popular', 'mostRecent' ];
const CURRENT_ORDER_GRAPHQL_MAP: Record<NonNullable<LiveStreamAPIGetCurrentParams['orderBy']>, LiveStreamListQueryVariables['orderBy']> = {
  popular: 'CURRENT_SPECTATORS',
  mostRecent: 'STARTED_AT'
};


export interface LiveStreamAPIGetCurrentParams extends APIPaginationParams {
  orderBy?: 'popular' | 'mostRecent';
  category?: string;
}

export default class LiveStreamAPI extends BaseAPI {

  async getCategories() {
    const data = await this.fetcher.fetchGraphQL('LiveStream', 'LiveStreamCategoryListQuery', null);
    return LiveStreamParser.parseLiveStreamCategories(data);
  }

  async getCurrent(params?: LiveStreamAPIGetCurrentParams) {
    const sanitizedParams = {
      ...this.sanitizePaginationParams(params),
      orderBy: this.sanitizeFromArray(params?.orderBy, CURRENT_ORDER_VALUES, 'popular'),
      category: params?.category || ''
    };

    const data = await this.fetcher.fetchGraphQL('LiveStream', 'LiveStreamListQuery', {
      count: sanitizedParams.limit,
      cursor: sanitizedParams.pageToken,
      orderBy: this.mapToGraphQLVariable(sanitizedParams.orderBy, CURRENT_ORDER_GRAPHQL_MAP),
      tag: sanitizedParams.category
    });

    return {
      ...LiveStreamParser.parseLiveStreams(data),
      params: sanitizedParams
    };
  }
}
