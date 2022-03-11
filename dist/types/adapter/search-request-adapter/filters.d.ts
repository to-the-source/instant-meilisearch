import { Filter, FacetsDistribution, FilterCache } from '../../types';
/**
 * @param  {Filter} filters?
 * @returns {FilterCache}
 */
export declare function cacheFilters(filters?: Filter): FilterCache;
/**
 * Assign missing filters to facetsDistribution.
 * All facet passed as filter should appear in the facetsDistribution.
 * If not present, the facet is added with 0 as value.
 *
 *
 * @param  {FilterCache} cache?
 * @param  {FacetsDistribution} distribution?
 * @returns {FacetsDistribution}
 */
export declare function assignMissingFilters(cachedFilters?: FilterCache, distribution?: FacetsDistribution): FacetsDistribution;
//# sourceMappingURL=filters.d.ts.map