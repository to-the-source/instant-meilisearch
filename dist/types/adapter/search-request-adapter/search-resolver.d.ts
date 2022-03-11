import { SearchContext, MeiliSearch, MeiliSearchResponse, SearchCacheInterface, MeiliSearchParams } from '../../types';
/**
 * @param  {ResponseCacher} cache
 */
export declare function SearchResolver(cache: SearchCacheInterface): {
    /**
     * @param  {SearchContext} searchContext
     * @param  {MeiliSearchParams} searchParams
     * @param  {MeiliSearch} client
     * @returns {Promise}
     */
    searchResponse: (searchContext: SearchContext, searchParams: MeiliSearchParams, client: MeiliSearch) => Promise<MeiliSearchResponse<Record<string, any>>>;
};
//# sourceMappingURL=search-resolver.d.ts.map