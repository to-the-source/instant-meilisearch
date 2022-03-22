import type { MeiliSearch, SearchResponse as MeiliSearchResponse, FacetsDistribution } from 'meilisearch';
import type { SearchClient } from 'instantsearch.js';
import type { MultipleQueriesQuery as AlgoliaMultipleQueriesQuery } from '@algolia/client-search';
export type { AlgoliaMultipleQueriesQuery };
export type { SearchResponse as AlgoliaSearchResponse } from '@algolia/client-search';
export type { Filter, FacetsDistribution, SearchResponse as MeiliSearchResponse, SearchParams as MeiliSearchParams, MeiliSearch, } from 'meilisearch';
export declare type InstantSearchParams = AlgoliaMultipleQueriesQuery['params'];
export declare type FacetsCache = {
    [category: string]: string[];
};
export declare type ParsedFilter = {
    filterName: string;
    value: string;
};
export declare type InstantMeiliSearchOptions = {
    paginationTotalHits?: number;
    placeholderSearch?: boolean;
    primaryKey?: string;
    keepZeroFacets?: boolean;
};
export declare type SearchCacheInterface = {
    getEntry: (key: string) => MeiliSearchResponse | undefined;
    formatKey: (components: any[]) => string;
    setEntry: <T>(key: string, searchResponse: T) => void;
};
export declare type InsideBoundingBox = string | ReadonlyArray<readonly number[]>;
declare type ClientParams = {
    primaryKey?: string;
    placeholderSearch?: boolean;
    sort?: string;
    indexUid: string;
    paginationTotalHits: number;
};
export declare type GeoSearchContext = {
    aroundLatLng?: string;
    aroundLatLngViaIP?: boolean;
    aroundRadius?: number | 'all';
    aroundPrecision?: number;
    minimumAroundRadius?: number;
    insideBoundingBox?: InsideBoundingBox;
    insidePolygon?: ReadonlyArray<readonly number[]>;
};
export declare type SearchContext = Omit<InstantSearchParams & ClientParams, 'insideBoundingBox'> & {
    insideBoundingBox?: InsideBoundingBox;
    keepZeroFacets?: boolean;
    defaultFacetDistribution: FacetsDistribution;
};
export declare type PaginationContext = {
    paginationTotalHits: number;
    hitsPerPage: number;
    page: number;
};
export declare type InstantMeiliSearchInstance = SearchClient & {
    MeiliSearchClient: MeiliSearch;
};
//# sourceMappingURL=types.d.ts.map