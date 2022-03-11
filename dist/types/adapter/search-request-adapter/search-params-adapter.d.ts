import type { MeiliSearchParams, SearchContext } from '../../types';
/**
 * Adapt search request from instantsearch.js
 * to search request compliant with Meilisearch
 *
 * @param  {SearchContext} searchContext
 * @returns {MeiliSearchParams}
 */
export declare function adaptSearchParams(searchContext: SearchContext): MeiliSearchParams;
//# sourceMappingURL=search-params-adapter.d.ts.map