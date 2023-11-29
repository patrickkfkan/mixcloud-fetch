import { CountryBundle } from '../entities/Misc.js';
import { CloudcastsByTagQueryVariables, FeaturedCloudcastsByTagQueryVariables } from '../graphql/Cloudcast.js';
import { GRAPHQL_QUERY_VARIABLES, GraphQLQueryDiscoverTagsVariable } from '../graphql/GraphQL.js';
import CloudcastParser from '../parser/CloudcastParser.js';
import TagParser from '../parser/TagParser.js';
import Fetcher from '../utils/Fetcher.js';
import ObjectHelper from '../utils/ObjectHelper.js';
import BaseAPI, { APIPaginationParams } from './BaseAPI.js';
import MiscAPI from './MiscAPI.js';

const SHOW_ORDER_VALUES: NonNullable<TagAPIGetShowsParams['orderBy']>[] = [ 'trending', 'popular', 'latest' ];
const SHOW_ORDER_GRAPHQL_MAP: Record<NonNullable<TagAPIGetShowsParams['orderBy']>, CloudcastsByTagQueryVariables['orderBy']> = {
  trending: null,
  popular: 'POPULAR',
  latest: 'LATEST'
};

const FEATURED_ORDER_VALUES: NonNullable<TagAPIGetFeaturedParams['orderBy']>[] = [ 'popular', 'latest' ];
const FEATURED_ORDER_GRAPHQL_MAP: Record<NonNullable<TagAPIGetFeaturedParams['orderBy']>, FeaturedCloudcastsByTagQueryVariables['orderBy']> = {
  popular: 'POPULAR',
  latest: 'LATEST'
};

export interface TagAPIGetShowsParams extends APIPaginationParams {
  orderBy?: 'trending' | 'popular' | 'latest';
  country?: string;
}

export interface TagAPIGetFeaturedParams extends APIPaginationParams {
  orderBy?: 'popular' | 'latest';
}

export default class TagAPI extends BaseAPI {

  #countries: CountryBundle;
  #slugs: string | string[];

  /**
   * @internal
   *
   * @param slugs
   * @param fetcher
   */
  constructor(slugs: string | string[], fetcher: Fetcher) {
    super(fetcher);
    this.#slugs = slugs;
  }

  async getInfo() {
    const data = await this.fetcher.fetchGraphQL('Tag', 'TagsQuery', {
      discoverTags: this.#convertSlugsToGraphQLDiscoverTagsVariables(this.#slugs)
    });
    return TagParser.parseTags(data);
  }

  async getShows(params?: TagAPIGetShowsParams) {
    const sanitizedOrderBy = this.sanitizeFromArray(params?.orderBy, SHOW_ORDER_VALUES, 'trending');
    const sanitizedParams = {
      ...this.sanitizePaginationParams(params),
      orderBy: sanitizedOrderBy,
      country: await this.#sanitizeCountry(sanitizedOrderBy, params?.country)
    };

    const data = await this.fetcher.fetchGraphQL('Cloudcast', 'CloudcastsByTagQuery', {
      discoverTags: this.#convertSlugsToGraphQLDiscoverTagsVariables(this.#slugs),
      count: sanitizedParams.limit,
      cursor: sanitizedParams.pageToken,
      orderBy: this.mapToGraphQLVariable(sanitizedParams.orderBy, SHOW_ORDER_GRAPHQL_MAP),
      country: sanitizedParams.country
    });

    return {
      ...CloudcastParser.parseCloudcastsByTag(data),
      params: sanitizedParams
    };
  }

  async getFeatured(params?: TagAPIGetFeaturedParams) {
    const sanitizedParams = {
      ...this.sanitizePaginationParams(params),
      orderBy: this.sanitizeFromArray(params?.orderBy, FEATURED_ORDER_VALUES, 'latest')
    };

    const data = await this.fetcher.fetchGraphQL('Cloudcast', 'FeaturedCloudcastsByTagQuery', {
      discoverTags: this.#convertSlugsToGraphQLDiscoverTagsVariables(this.#slugs),
      count: sanitizedParams.limit,
      cursor: sanitizedParams.pageToken,
      orderBy: this.mapToGraphQLVariable(sanitizedParams.orderBy, FEATURED_ORDER_GRAPHQL_MAP)
    });

    return {
      ...CloudcastParser.parseCloudcastsByTag(data),
      params: sanitizedParams
    };
  }

  #convertSlugsToGraphQLDiscoverTagsVariables(slugs: string | string[]): GraphQLQueryDiscoverTagsVariable[] {
    if (Array.isArray(slugs)) {
      return slugs.map((slug) => {
        return {
          slug,
          type: 'TAG'
        };
      });
    }
    else if (typeof slugs === 'string' && slugs.trim().length > 0) {
      return [ { slug: slugs, type: 'TAG' } ];
    }

    return [];

  }

  async #sanitizeCountry(orderBy: TagAPIGetShowsParams['orderBy'], value?: string) {
    /**
     * Country can only be specified when orderBy is 'trending'.
     * For other orderBy values, country will always be default ('global').
     */
    if (orderBy === 'trending') {
      const countries = await this.#getCountries();
      if (!value || !countries.available.find((c) => c.code === value)) {
        return ObjectHelper.getProperty(countries, 'default.code') || GRAPHQL_QUERY_VARIABLES.GLOBAL_COUNTRY;
      }
      return value;
    }
    return GRAPHQL_QUERY_VARIABLES.GLOBAL_COUNTRY;
  }

  async #getCountries() {
    if (!this.#countries) {
      this.#countries = await new MiscAPI(this.fetcher).getCountries();
    }
    return this.#countries;
  }
}
