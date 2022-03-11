import { SearchContext, GeoSearchContext } from '../../types';
export declare function adaptGeoPointsRules(geoSearchContext?: GeoSearchContext): {
    filter?: string;
    sort?: string;
} | undefined;
export declare function createGeoSearchContext(searchContext: SearchContext): GeoSearchContext;
//# sourceMappingURL=geo-rules-adapter.d.ts.map