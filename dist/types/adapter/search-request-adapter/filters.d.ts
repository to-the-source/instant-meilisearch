import { Filter, FacetsDistribution, FacetsCache, MeiliSearchParams, SearchContext } from '../../types';
/**
 * @param  {Filter} filters?
 * @returns {FacetsCache}
 */
export declare function getFacetsFromFilter(filters?: Filter): FacetsCache;
/**
 * @param  {Filter} filters?
 * @returns {FacetsCache}
 */
export declare function extractFacets(searchContext: SearchContext, searchParams: MeiliSearchParams): FacetsCache;
/**
 * Assign missing filters to facetsDistribution.
 * All facet passed as filter should appear in the facetsDistribution.
 * If not present, the facet is added with 0 as value.
 *
 *
 * @param  {FacetsCache} cache?
 * @param  {FacetsDistribution} distribution?
 * @returns {FacetsDistribution}
 */
export declare function addMissingFacets(cachedFacets?: FacetsCache, distribution?: FacetsDistribution): FacetsDistribution;
//# sourceMappingURL=filters.d.ts.map