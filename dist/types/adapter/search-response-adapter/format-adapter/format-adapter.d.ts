import { SearchContext } from '../../../types';
/**
 * Adapt Meilisearch formating to formating compliant with instantsearch.js.
 *
 * @param  {Record<string} formattedHit
 * @param  {SearchContext} searchContext
 * @returns {Record}
 */
export declare function adaptFormating(hit: Record<string, any>, searchContext: SearchContext): Record<string, any>;
//# sourceMappingURL=format-adapter.d.ts.map