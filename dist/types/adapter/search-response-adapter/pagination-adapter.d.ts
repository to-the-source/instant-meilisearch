import { SearchContext, PaginationContext } from '../../types';
/**
 * Slice the requested hits based on the pagination position.
 *
 * @param  {Record<string} hits
 * @param  {number} page
 * @param  {number} hitsPerPage
 * @returns {Array}
 */
export declare function adaptPagination(hits: Record<string, any>, page: number, hitsPerPage: number): Array<Record<string, any>>;
/**
 * @param  {AlgoliaMultipleQueriesQuery} searchRequest
 * @param  {Context} options
 * @returns {SearchContext}
 */
export declare function createPaginationContext(searchContext: SearchContext): PaginationContext;
//# sourceMappingURL=pagination-adapter.d.ts.map