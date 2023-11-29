import { GraphQLSearchQueryRecency } from '../graphql/GraphQL.js';
import { SearchUsersQueryVariables } from '../graphql/User.js';
import CloudcastParser from '../parser/CloudcastParser.js';
import TagParser from '../parser/TagParser.js';
import UserParser from '../parser/UserParser.js';
import Fetcher from '../utils/Fetcher.js';
import BaseAPI, { APIPaginationParams } from './BaseAPI.js';

export type SearchAPIGetTagsParams = APIPaginationParams;

const RECENCY_VALUES: SearchAPIRecencyParam[] = [ 'pastWeek', 'pastMonth', 'pastYear', 'anyTime' ];
const RECENCY_GRAPHQL_MAP: Record<SearchAPIRecencyParam, GraphQLSearchQueryRecency> = {
  pastWeek: 'PAST_WEEK',
  pastMonth: 'PAST_MONTH',
  pastYear: 'PAST_YEAR',
  anyTime: null
};

const USER_TYPE_VALUES: NonNullable<SearchAPIGetUsersParams['userType']>[] = [ 'uploader', 'listener', 'any' ];
const USER_TYPE_GRAPHQL_MAP: Record<NonNullable<SearchAPIGetUsersParams['userType']>, SearchUsersQueryVariables['isUploader']> = {
  uploader: 'YES',
  listener: 'NO',
  any: null
};

export type SearchAPIRecencyParam = 'pastWeek' | 'pastMonth' | 'pastYear' | 'anyTime';

export interface SearchAPIGetShowsParams extends APIPaginationParams {
  dateUploaded?: SearchAPIRecencyParam;
  requireTimeStamp?: boolean;
}

export interface SearchAPIGetUsersParams extends APIPaginationParams {
  dateJoined?: SearchAPIRecencyParam;
  userType?: 'uploader' | 'listener' | 'any';
}

export default class SearchAPI extends BaseAPI {

  #keywords: string;

  /**
   * @internal
   *
   * @param keywords
   * @param fetcher
   */
  constructor(keywords: string, fetcher: Fetcher) {
    super(fetcher);
    this.#keywords = keywords;
  }

  async getTags(params?: SearchAPIGetTagsParams) {
    const page = this.sanitizePaginationParams(params);
    const data = await this.fetcher.fetchGraphQL('Tag', 'SearchTagsQuery', {
      term: this.#keywords,
      tagCount: page.limit,
      cursor: page.pageToken
    });
    return {
      ...TagParser.parseTagSearchResults(data),
      params: page
    };
  }

  async getShows(params?: SearchAPIGetShowsParams) {
    const sanitizedParams = {
      ...this.sanitizePaginationParams(params),
      dateUploaded: this.sanitizeFromArray(params?.dateUploaded, RECENCY_VALUES, 'anyTime'),
      requireTimestamp: params?.requireTimeStamp !== undefined ? params.requireTimeStamp : false
    };

    const data = await this.fetcher.fetchGraphQL('Cloudcast', 'SearchCloudcastsQuery', {
      term: this.#keywords,
      cloudcastCount: sanitizedParams.limit,
      cursor: sanitizedParams.pageToken,
      createdAfter: this.mapToGraphQLVariable(sanitizedParams.dateUploaded, RECENCY_GRAPHQL_MAP),
      isTimestamped: sanitizedParams.requireTimestamp ? 'YES' : null
    });

    return {
      ...CloudcastParser.parseCloudcastSearchResults(data),
      params: sanitizedParams
    };
  }

  async getUsers(params?: SearchAPIGetUsersParams) {
    const sanitizedParams = {
      ...this.sanitizePaginationParams(params),
      dateJoined: this.sanitizeFromArray(params?.dateJoined, RECENCY_VALUES, 'anyTime'),
      userType: this.sanitizeFromArray(params?.userType, USER_TYPE_VALUES, 'any')
    };

    const data = await this.fetcher.fetchGraphQL('User', 'SearchUsersQuery', {
      term: this.#keywords,
      userCount: sanitizedParams.limit,
      cursor: sanitizedParams.pageToken,
      dateJoinedAfter: this.mapToGraphQLVariable(sanitizedParams.dateJoined, RECENCY_GRAPHQL_MAP),
      isUploader: this.mapToGraphQLVariable(sanitizedParams.userType, USER_TYPE_GRAPHQL_MAP)
    });

    return {
      ...UserParser.parseUserSearchResults(data),
      params: sanitizedParams
    };
  }
}
