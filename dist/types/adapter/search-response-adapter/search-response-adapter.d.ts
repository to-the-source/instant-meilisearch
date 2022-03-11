import type { SearchContext, MeiliSearchResponse, AlgoliaSearchResponse, PaginationContext } from '../../types';
/**
 * Adapt search response from Meilisearch
 * to search response compliant with instantsearch.js
 *
 * @param  {MeiliSearchResponse<Record<string} searchResponse
 * @param  {SearchContext} searchContext
 * @param  {PaginationContext} paginationContext
 * @returns {{ results: Array<AlgoliaSearchResponse<T>> }}
 */
export declare function adaptSearchResponse<T>(searchResponse: MeiliSearchResponse<Record<string, any>>, searchContext: SearchContext, paginationContext: PaginationContext): {
    results: Array<AlgoliaSearchResponse<T>>;
};
//# sourceMappingURL=search-response-adapter.d.ts.map