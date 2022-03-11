import { MeiliSearch } from 'meilisearch';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var removeUndefined = function (arr) {
    return arr.filter(function (x) { return x !== undefined; });
};

/**
 * @param  {any} str
 * @returns {boolean}
 */
function isString(str) {
    return typeof str === 'string' || str instanceof String;
}
/**
 * @param  {string} filter
 * @returns {string}
 */
function replaceColonByEqualSign(filter) {
    // will only change first occurence of `:`
    return filter.replace(/:(.*)/i, '="$1"');
}
/**
 * @param  {any[]} arr
 * @returns {string}
 */
function stringifyArray(arr) {
    return arr.reduce(function (acc, curr) {
        return (acc += JSON.stringify(curr));
    }, '');
}

/**
 * @param  {number} dividend
 * @param  {number} divisor
 * @returns number
 */
function ceiledDivision(dividend, divisor) {
    if (divisor > 0) {
        var NumberPages = Math.ceil(dividend / divisor); // total number of pages rounded up to the next largest integer.
        return NumberPages;
    }
    return 0;
}

/**
 * @param  {string} filter
 */
var adaptFilterSyntax = function (filter) {
    var matches = filter.match(/([^=]*)="?([^\\"]*)"?$/);
    if (matches) {
        matches[0]; var filterName = matches[1], value = matches[2];
        return [{ filterName: filterName, value: value }];
    }
    return [];
};
/**
 * @param  {Filter} filters?
 * @returns {Array}
 */
function extractFilters(filters) {
    if (typeof filters === 'string') {
        return adaptFilterSyntax(filters);
    }
    else if (Array.isArray(filters)) {
        return filters
            .map(function (nestedFilter) {
            if (Array.isArray(nestedFilter)) {
                return nestedFilter.map(function (filter) { return adaptFilterSyntax(filter); });
            }
            return adaptFilterSyntax(nestedFilter);
        })
            .flat(2);
    }
    return [];
}
/**
 * @param  {Filter} filters?
 * @returns {FilterCache}
 */
function cacheFilters(filters) {
    var extractedFilters = extractFilters(filters);
    var cleanFilters = removeUndefined(extractedFilters);
    return cleanFilters.reduce(function (cache, parsedFilter) {
        var _a;
        var filterName = parsedFilter.filterName, value = parsedFilter.value;
        var prevFields = cache[filterName] || [];
        cache = __assign(__assign({}, cache), (_a = {}, _a[filterName] = __spreadArray(__spreadArray([], prevFields, true), [value]), _a));
        return cache;
    }, {});
}
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
function assignMissingFilters(cachedFilters, distribution) {
    distribution = distribution || {};
    // If cachedFilters contains something
    if (cachedFilters && Object.keys(cachedFilters).length > 0) {
        // for all filters in cached filters
        for (var cachedFacet in cachedFilters) {
            // if facet does not exist on returned distribution, add an empty object
            if (!distribution[cachedFacet])
                distribution[cachedFacet] = {};
            // for all fields in every filter
            for (var _i = 0, _a = cachedFilters[cachedFacet]; _i < _a.length; _i++) {
                var cachedField = _a[_i];
                // if the field is not present in the returned distribution
                // set it at 0
                if (!Object.keys(distribution[cachedFacet]).includes(cachedField)) {
                    // add 0 value
                    distribution[cachedFacet][cachedField] = 0;
                }
            }
        }
    }
    return distribution;
}

/**
 * @param  {ResponseCacher} cache
 */
function SearchResolver(cache) {
    return {
        /**
         * @param  {SearchContext} searchContext
         * @param  {MeiliSearchParams} searchParams
         * @param  {MeiliSearch} client
         * @returns {Promise}
         */
        searchResponse: function (searchContext, searchParams, client) {
            return __awaiter(this, void 0, void 0, function () {
                var key, entry, filterCache, searchResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = cache.formatKey([
                                searchParams,
                                searchContext.indexUid,
                                searchContext.query,
                            ]);
                            entry = cache.getEntry(key);
                            // Request is cached.
                            if (entry)
                                return [2 /*return*/, entry
                                    // Cache filters: todo components
                                ];
                            filterCache = cacheFilters(searchParams === null || searchParams === void 0 ? void 0 : searchParams.filter);
                            return [4 /*yield*/, client
                                    .index(searchContext.indexUid)
                                    .search(searchContext.query, searchParams)
                                // Add facets back into facetsDistribution
                            ];
                        case 1:
                            searchResponse = _a.sent();
                            // Add facets back into facetsDistribution
                            searchResponse.facetsDistribution = assignMissingFilters(filterCache, searchResponse.facetsDistribution);
                            // Cache response
                            cache.setEntry(key, searchResponse);
                            return [2 /*return*/, searchResponse];
                    }
                });
            });
        }
    };
}

/**
 * @param  {number} rad
 * @returns {number}
 */
function rad2degr(rad) {
    return (rad * 180) / Math.PI;
}
/**
 * @param  {number} degr
 * @returns {number}
 */
function degr2rad(degr) {
    return (degr * Math.PI) / 180;
}
/**
 * @param  {number} lat1
 * @param  {number} lng1
 * @param  {number} lat2
 * @param  {number} lng2
 * @returns {string}
 */
function middleGeoPoints(lat1, lng1, lat2, lng2) {
    // convert to radians
    lat1 = degr2rad(lat1);
    lng1 = degr2rad(lng1);
    var x1 = Math.cos(lat1) * Math.cos(lng1);
    var y1 = Math.cos(lat1) * Math.sin(lng1);
    var z1 = Math.sin(lat1);
    // convert to radians
    lat2 = degr2rad(lat2);
    lng2 = degr2rad(lng2);
    var x2 = Math.cos(lat2) * Math.cos(lng2);
    var y2 = Math.cos(lat2) * Math.sin(lng2);
    var z2 = Math.sin(lat2);
    var x = x1 + x2;
    var y = y1 + y2;
    var z = z1 + z2;
    var Hyp = Math.sqrt(x * x + y * y);
    var lng3 = Math.atan2(y, x);
    var lat3 = Math.atan2(z, Hyp);
    if (lng1 < lng2 || (lng1 > lng2 && lng1 > Math.PI && lng2 < -Math.PI)) {
        lat3 = lat3 + Math.PI;
        lng3 = lng3 + Math.PI;
    }
    else {
        lat3 = rad2degr(lat3);
        lng3 = rad2degr(lng3);
    }
    if (Math.abs(x) < Math.pow(10, -9) &&
        Math.abs(y) < Math.pow(10, -9) &&
        Math.abs(z) < Math.pow(10, -9)) {
        lat3 = 0;
        lng3 = 0;
    }
    return "".concat(lat3, ",").concat(lng3);
}
/**
 * @param  {number} lat1
 * @param  {number} lng1
 * @param  {number} lat2
 * @param  {number} lng2
 * @returns {number}
 */
function getDistanceInMeter(lat1, lng1, lat2, lng2) {
    // Haversine Algorithm
    var R = 6371e3; // metres
    var latRad1 = (lat1 * Math.PI) / 180;
    var latRad2 = (lat2 * Math.PI) / 180;
    var latCenterRad = ((lat2 - lat1) * Math.PI) / 180;
    var lngCenterRad = ((lng2 - lng1) * Math.PI) / 180;
    var a = Math.sin(latCenterRad / 2) * Math.sin(latCenterRad / 2) +
        Math.cos(latRad1) *
            Math.cos(latRad2) *
            Math.sin(lngCenterRad / 2) *
            Math.sin(lngCenterRad / 2);
    var bearing = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * bearing; // in metres
    return distance;
}

function adaptGeoPointsRules(geoSearchContext) {
    if (!geoSearchContext) {
        return undefined;
    }
    var insideBoundingBox = geoSearchContext.insideBoundingBox, aroundLatLng = geoSearchContext.aroundLatLng, aroundRadius = geoSearchContext.aroundRadius, minimumAroundRadius = geoSearchContext.minimumAroundRadius;
    var middlePoint;
    var radius;
    if (aroundLatLng) {
        middlePoint = aroundLatLng;
    }
    if (aroundRadius != null || minimumAroundRadius != null) {
        if (aroundRadius != null)
            radius = aroundRadius;
        else
            radius = minimumAroundRadius;
    }
    // If insideBoundingBox is provided it takes precedent over all other options
    if (insideBoundingBox && typeof insideBoundingBox === 'string') {
        var _a = insideBoundingBox.split(','), lat1Raw = _a[0], lng1Raw = _a[1], lat2Raw = _a[2], lng2Raw = _a[3];
        var _b = [
            parseFloat(lat1Raw),
            parseFloat(lng1Raw),
            parseFloat(lat2Raw),
            parseFloat(lng2Raw),
        ], lat1 = _b[0], lng1 = _b[1], lat2 = _b[2], lng2 = _b[3];
        radius = getDistanceInMeter(lat1, lng1, lat2, lng2) / 2;
        middlePoint = middleGeoPoints(lat1, lng1, lat2, lng2);
    }
    if (middlePoint != null && radius != null) {
        var _c = middlePoint.split(','), lat3 = _c[0], lng3 = _c[1];
        lat3 = Number.parseFloat(lat3).toFixed(5);
        lng3 = Number.parseFloat(lng3).toFixed(5);
        var filter = "_geoRadius(".concat(lat3, ", ").concat(lng3, ", ").concat(radius, ")");
        return { filter: filter };
    }
    return undefined;
}
function createGeoSearchContext(searchContext) {
    var geoContext = {};
    var aroundLatLng = searchContext.aroundLatLng, aroundLatLngViaIP = searchContext.aroundLatLngViaIP, aroundRadius = searchContext.aroundRadius, aroundPrecision = searchContext.aroundPrecision, minimumAroundRadius = searchContext.minimumAroundRadius, insideBoundingBox = searchContext.insideBoundingBox, insidePolygon = searchContext.insidePolygon;
    if (aroundLatLng) {
        geoContext.aroundLatLng = aroundLatLng;
    }
    if (aroundLatLngViaIP) {
        console.warn('instant-meilisearch: `aroundLatLngViaIP` is not supported.');
    }
    if (aroundRadius) {
        geoContext.aroundRadius = aroundRadius;
    }
    if (aroundPrecision) {
        console.warn("instant-meilisearch: `aroundPrecision` is not supported.\n    See this discussion to track its implementation https://github.com/meilisearch/product/discussions/264");
    }
    if (minimumAroundRadius) {
        geoContext.minimumAroundRadius = minimumAroundRadius;
    }
    if (insideBoundingBox) {
        geoContext.insideBoundingBox = insideBoundingBox;
    }
    // See related issue: https://github.com/meilisearch/instant-meilisearch/issues/555
    if (insidePolygon) {
        console.warn("instant-meilisearch: `insidePolygon` is not implented in instant-meilisearch.");
    }
    return geoContext;
}

/**
 * Transform InstantSearch filter to Meilisearch filter.
 * Change sign from `:` to `=` in nested filter object.
 * example: [`genres:comedy`] becomes [`genres=comedy`]
 *
 * @param  {SearchContext['facetFilters']} filters?
 * @returns {Filter}
 */
function transformFilter(filters) {
    if (typeof filters === 'string') {
        return replaceColonByEqualSign(filters);
    }
    else if (Array.isArray(filters))
        return filters
            .map(function (filter) {
            if (Array.isArray(filter))
                return filter
                    .map(function (nestedFilter) { return replaceColonByEqualSign(nestedFilter); })
                    .filter(function (elem) { return elem; });
            else {
                return replaceColonByEqualSign(filter);
            }
        })
            .filter(function (elem) { return elem; });
    return [];
}
/**
 * Return the filter in an array if it is a string
 * If filter is array, return without change.
 *
 * @param  {Filter} filter
 * @returns {Array}
 */
function filterToArray(filter) {
    // Filter is a string
    if (filter === '')
        return [];
    else if (typeof filter === 'string')
        return [filter];
    // Filter is either an array of strings, or an array of array of strings
    return filter;
}
/**
 * Merge facetFilters, numericFilters and filters together.
 *
 * @param  {Filter} facetFilters
 * @param  {Filter} numericFilters
 * @param  {string} filters
 * @returns {Filter}
 */
function mergeFilters(facetFilters, numericFilters, filters) {
    var adaptedFilters = filters.trim();
    var adaptedFacetFilters = filterToArray(facetFilters);
    var adaptedNumericFilters = filterToArray(numericFilters);
    var adaptedFilter = __spreadArray(__spreadArray(__spreadArray([], adaptedFacetFilters, true), adaptedNumericFilters, true), [
        adaptedFilters,
    ]);
    var cleanedFilters = adaptedFilter.filter(function (filter) {
        if (Array.isArray(filter)) {
            return filter.length;
        }
        return filter;
    });
    return cleanedFilters;
}
/**
 * Adapt instantsearch.js filters to Meilisearch filters by
 * combining and transforming all provided filters.
 *
 * @param  {string|undefined} filters
 * @param  {SearchContext['numericFilters']} numericFilters
 * @param  {SearchContext['facetFilters']} facetFilters
 * @returns {Filter}
 */
function adaptFilters(filters, numericFilters, facetFilters) {
    var transformedFilter = transformFilter(facetFilters || []);
    var transformedNumericFilter = transformFilter(numericFilters || []);
    return mergeFilters(transformedFilter, transformedNumericFilter, filters || '');
}

/**
 * Adapt search request from instantsearch.js
 * to search request compliant with Meilisearch
 *
 * @param  {SearchContext} searchContext
 * @returns {MeiliSearchParams}
 */
function adaptSearchParams(searchContext) {
    // Creates search params object compliant with Meilisearch
    var meiliSearchParams = {};
    // Facets
    var facets = searchContext === null || searchContext === void 0 ? void 0 : searchContext.facets;
    if (facets === null || facets === void 0 ? void 0 : facets.length) {
        meiliSearchParams.facetsDistribution = facets;
    }
    // Attributes To Crop
    var attributesToCrop = searchContext === null || searchContext === void 0 ? void 0 : searchContext.attributesToSnippet;
    if (attributesToCrop) {
        meiliSearchParams.attributesToCrop = attributesToCrop;
    }
    // Attributes To Retrieve
    var attributesToRetrieve = searchContext === null || searchContext === void 0 ? void 0 : searchContext.attributesToRetrieve;
    if (attributesToRetrieve) {
        meiliSearchParams.attributesToRetrieve = attributesToRetrieve;
    }
    // Filter
    var filter = adaptFilters(searchContext === null || searchContext === void 0 ? void 0 : searchContext.filters, searchContext === null || searchContext === void 0 ? void 0 : searchContext.numericFilters, searchContext === null || searchContext === void 0 ? void 0 : searchContext.facetFilters);
    if (filter.length) {
        meiliSearchParams.filter = filter;
    }
    // Attributes To Retrieve
    // if (attributesToRetrieve) {
    //   meiliSearchParams.attributesToCrop = attributesToRetrieve
    // }
    // Attributes To Highlight
    meiliSearchParams.attributesToHighlight = (searchContext === null || searchContext === void 0 ? void 0 : searchContext.attributesToHighlight) || [
        '*',
    ];
    var placeholderSearch = searchContext.placeholderSearch;
    var query = searchContext.query;
    var paginationTotalHits = searchContext.paginationTotalHits;
    // Limit
    if ((!placeholderSearch && query === '') || paginationTotalHits === 0) {
        meiliSearchParams.limit = 0;
    }
    else {
        meiliSearchParams.limit = paginationTotalHits;
    }
    var sort = searchContext.sort;
    // Sort
    if (sort === null || sort === void 0 ? void 0 : sort.length) {
        meiliSearchParams.sort = [sort];
    }
    var geoSearchContext = createGeoSearchContext(searchContext);
    var geoRules = adaptGeoPointsRules(geoSearchContext);
    if (geoRules === null || geoRules === void 0 ? void 0 : geoRules.filter) {
        if (meiliSearchParams.filter) {
            meiliSearchParams.filter.unshift(geoRules.filter);
        }
        else {
            meiliSearchParams.filter = [geoRules.filter];
        }
    }
    return meiliSearchParams;
}

/**
 * Slice the requested hits based on the pagination position.
 *
 * @param  {Record<string} hits
 * @param  {number} page
 * @param  {number} hitsPerPage
 * @returns {Array}
 */
function adaptPagination(hits, page, hitsPerPage) {
    if (hitsPerPage < 0) {
        throw new TypeError('Value too small for "hitsPerPage" parameter, expected integer between 0 and 9223372036854775807');
    }
    var start = page * hitsPerPage;
    return hits.slice(start, start + hitsPerPage);
}

/**
 * Replace `em` tags in highlighted Meilisearch hits to
 * provided tags by instantsearch.js.
 *
 * @param  {string} value
 * @param  {string} highlightPreTag?
 * @param  {string} highlightPostTag?
 * @returns {string}
 */
function replaceDefaultEMTag(value, preTag, postTag) {
    if (preTag === void 0) { preTag = '__ais-highlight__'; }
    if (postTag === void 0) { postTag = '__/ais-highlight__'; }
    // Highlight is applied by Meilisearch (<em> tags)
    // We replace the <em> by the expected tag for InstantSearch
    var stringifiedValue = isString(value) ? value : JSON.stringify(value);
    return stringifiedValue.replace(/<em>/g, preTag).replace(/<\/em>/g, postTag);
}
function addHighlightTags(value, preTag, postTag) {
    if (typeof value === 'string') {
        // String
        return replaceDefaultEMTag(value, preTag, postTag);
    }
    else if (value === undefined) {
        // undefined
        return JSON.stringify(null);
    }
    else {
        // Other
        return JSON.stringify(value);
    }
}
function resolveHighlightValue(value, preTag, postTag) {
    if (Array.isArray(value)) {
        // Array
        return value.map(function (elem) { return ({
            value: addHighlightTags(elem, preTag, postTag)
        }); });
    }
    else {
        return { value: addHighlightTags(value, preTag, postTag) };
    }
}
/**
 * @param  {Record<string} formattedHit
 * @param  {string} highlightPreTag?
 * @param  {string} highlightPostTag?
 * @returns {Record}
 */
function adaptHighlight(hit, preTag, postTag) {
    // hit is the `_formatted` object returned by Meilisearch.
    // It contains all the highlighted and croped attributes
    if (!hit._formatted)
        return hit._formatted;
    return Object.keys(hit._formatted).reduce(function (result, key) {
        var value = hit._formatted[key];
        result[key] = resolveHighlightValue(value, preTag, postTag);
        return result;
    }, {});
}

function nakedOfTags(str) {
    return str.replace(/<em>/g, '').replace(/<\/em>/g, '');
}
function addEllipsis(value, formatValue, ellipsis) {
    // Manage ellpsis on cropped values until this feature is implemented https://roadmap.meilisearch.com/c/69-policy-for-cropped-values?utm_medium=social&utm_source=portal_share in Meilisearch
    var ellipsedValue = formatValue;
    if (isString(formatValue) &&
        value.toString().length > nakedOfTags(formatValue).length) {
        if (formatValue[0] === formatValue[0].toLowerCase() && // beginning of a sentence
            formatValue.startsWith('<em>') === false // beginning of the document field, otherwise Meilisearch would crop around the highlight
        ) {
            ellipsedValue = "".concat(ellipsis).concat(formatValue.trim());
        }
        if (!!formatValue.match(/[.!?]$/) === false) {
            // end of the sentence
            ellipsedValue = "".concat(formatValue.trim()).concat(ellipsis);
        }
    }
    return ellipsedValue;
}
/**
 * @param  {string} value
 * @param  {string} ellipsis?
 * @returns {string}
 */
function resolveSnippet(value, formatValue, ellipsis) {
    if (!ellipsis || !(typeof formatValue === 'string')) {
        return formatValue;
    }
    else if (Array.isArray(value)) {
        // Array
        return value.map(function (elem) { return addEllipsis(elem, formatValue, ellipsis); });
    }
    return addEllipsis(value, formatValue, ellipsis);
}
/**
 * @param  {Record<string} hit
 * @param  {readonlystring[]|undefined} attributes
 * @param  {string|undefined} ellipsis
 */
function adaptSnippet(hit, attributes, ellipsis) {
    // hit is the `_formatted` object returned by Meilisearch.
    // It contains all the highlighted and croped attributes
    var formattedHit = hit._formatted;
    var newHit = hit._formatted;
    if (attributes === undefined) {
        return hit;
    }
    // All attributes that should be snippeted and their snippet size
    var snippets = attributes.map(function (attribute) { return attribute.split(':')[0]; });
    // Find presence of a wildcard *
    var wildCard = snippets.includes('*');
    if (wildCard) {
        // In case of *
        for (var attribute in formattedHit) {
            newHit[attribute] = resolveSnippet(hit[attribute], formattedHit[attribute], ellipsis);
        }
    }
    else {
        // Itterate on all attributes that needs snippeting
        for (var _i = 0, snippets_1 = snippets; _i < snippets_1.length; _i++) {
            var attribute = snippets_1[_i];
            newHit[attribute] = resolveSnippet(hit[attribute], formattedHit[attribute], ellipsis);
        }
    }
    hit._formatted = newHit;
    return hit;
}

/**
 * Adapt Meilisearch formating to formating compliant with instantsearch.js.
 *
 * @param  {Record<string} formattedHit
 * @param  {SearchContext} searchContext
 * @returns {Record}
 */
function adaptFormating(hit, searchContext) {
    var attributesToSnippet = searchContext === null || searchContext === void 0 ? void 0 : searchContext.attributesToSnippet;
    var ellipsis = searchContext === null || searchContext === void 0 ? void 0 : searchContext.snippetEllipsisText;
    var preTag = searchContext === null || searchContext === void 0 ? void 0 : searchContext.highlightPreTag;
    var postTag = searchContext === null || searchContext === void 0 ? void 0 : searchContext.highlightPostTag;
    if (!hit._formatted)
        return {};
    var _highlightResult = adaptHighlight(hit, preTag, postTag);
    // what is ellipsis by default
    var _snippetResult = adaptHighlight(adaptSnippet(hit, attributesToSnippet, ellipsis), preTag, postTag);
    var highlightedHit = {
        _highlightResult: _highlightResult,
        _snippetResult: _snippetResult
    };
    return highlightedHit;
}

/**
 * @param  {any[]} hits
 * @returns {Array<Record<string, any>>}
 */
function adaptGeoResponse(hits) {
    for (var i = 0; i < hits.length; i++) {
        if (hits[i]._geo) {
            hits[i]._geoloc = {
                lat: hits[i]._geo.lat,
                lng: hits[i]._geo.lng
            };
            hits[i].objectID = "".concat(i + Math.random() * 1000000);
            delete hits[i]._geo;
        }
    }
    return hits;
}

/**
 * @param  {Array<Record<string} hits
 * @param  {SearchContext} searchContext
 * @param  {PaginationContext} paginationContext
 * @returns {any}
 */
function adaptHits(hits, searchContext, paginationContext) {
    var primaryKey = searchContext.primaryKey;
    var hitsPerPage = paginationContext.hitsPerPage, page = paginationContext.page;
    var paginatedHits = adaptPagination(hits, page, hitsPerPage);
    var formattedHits = paginatedHits.map(function (hit) {
        // Creates Hit object compliant with InstantSearch
        if (Object.keys(hit).length > 0) {
            hit._formatted; hit._matchesInfo; var restOfHit = __rest(hit, ["_formatted", "_matchesInfo"]);
            return __assign(__assign(__assign({}, restOfHit), adaptFormating(hit, searchContext)), (primaryKey && { objectID: hit[primaryKey] }));
        }
        return hit;
    });
    formattedHits = adaptGeoResponse(formattedHits);
    return formattedHits;
}

/**
 * Adapt search response from Meilisearch
 * to search response compliant with instantsearch.js
 *
 * @param  {MeiliSearchResponse<Record<string} searchResponse
 * @param  {SearchContext} searchContext
 * @param  {PaginationContext} paginationContext
 * @returns {{ results: Array<AlgoliaSearchResponse<T>> }}
 */
function adaptSearchResponse(searchResponse, searchContext, paginationContext) {
    var searchResponseOptionals = {};
    var facets = searchResponse.facetsDistribution;
    var exhaustiveFacetsCount = searchResponse === null || searchResponse === void 0 ? void 0 : searchResponse.exhaustiveFacetsCount;
    if (exhaustiveFacetsCount) {
        searchResponseOptionals.exhaustiveFacetsCount = exhaustiveFacetsCount;
    }
    var nbPages = ceiledDivision(searchResponse.hits.length, paginationContext.hitsPerPage);
    var hits = adaptHits(searchResponse.hits, searchContext, paginationContext);
    var exhaustiveNbHits = searchResponse.exhaustiveNbHits;
    var nbHits = searchResponse.nbHits;
    var processingTimeMs = searchResponse.processingTimeMs;
    var query = searchResponse.query;
    var hitsPerPage = paginationContext.hitsPerPage, page = paginationContext.page;
    // Create response object compliant with InstantSearch
    var adaptedSearchResponse = __assign({ index: searchContext.indexUid, hitsPerPage: hitsPerPage, page: page, facets: facets, nbPages: nbPages, exhaustiveNbHits: exhaustiveNbHits, nbHits: nbHits, processingTimeMS: processingTimeMs, query: query, hits: hits, params: '' }, searchResponseOptionals);
    return {
        results: [adaptedSearchResponse]
    };
}

/**
 * @param  {Record<string} cache
 * @returns {SearchCache}
 */
function SearchCache(cache) {
    if (cache === void 0) { cache = {}; }
    var searchCache = cache;
    return {
        getEntry: function (key) {
            if (searchCache[key]) {
                try {
                    return JSON.parse(searchCache[key]);
                }
                catch (_) {
                    return searchCache[key];
                }
            }
            return undefined;
        },
        formatKey: function (components) {
            return stringifyArray(components);
        },
        setEntry: function (key, searchResponse) {
            searchCache[key] = JSON.stringify(searchResponse);
        }
    };
}

/**
 * Instanciate SearchClient required by instantsearch.js.
 *
 * @param  {string} hostUrl
 * @param  {string} apiKey
 * @param  {InstantMeiliSearchOptions={}} meiliSearchOptions
 * @returns {InstantMeiliSearchInstance}
 */
function instantMeiliSearch(hostUrl, apiKey, options) {
    if (apiKey === void 0) { apiKey = ''; }
    if (options === void 0) { options = {}; }
    // create search resolver with included cache
    var searchResolver = SearchResolver(SearchCache());
    // paginationTotalHits can be 0 as it is a valid number
    var paginationTotalHits = options.paginationTotalHits != null ? options.paginationTotalHits : 200;
    var context = {
        primaryKey: options.primaryKey || undefined,
        placeholderSearch: options.placeholderSearch !== false,
        paginationTotalHits: paginationTotalHits
    };
    return {
        MeiliSearchClient: new MeiliSearch({ host: hostUrl, apiKey: apiKey }),
        /**
         * @param  {readonlyAlgoliaMultipleQueriesQuery[]} instantSearchRequests
         * @returns {Array}
         */
        search: function (instantSearchRequests) {
            return __awaiter(this, void 0, void 0, function () {
                var searchRequest, instantSearchParams, searchContext, paginationContext, adaptedSearchRequest, searchResponse, adaptedSearchResponse, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            searchRequest = instantSearchRequests[0];
                            instantSearchParams = searchRequest.params;
                            searchContext = createSearchContext(searchRequest, context);
                            paginationContext = createPaginationContext(searchContext, instantSearchParams);
                            adaptedSearchRequest = adaptSearchParams(searchContext);
                            return [4 /*yield*/, searchResolver.searchResponse(searchContext, adaptedSearchRequest, this.MeiliSearchClient)
                                // Adapt the Meilisearch responsne to a compliant instantsearch.js response
                            ];
                        case 1:
                            searchResponse = _a.sent();
                            adaptedSearchResponse = adaptSearchResponse(searchResponse, searchContext, paginationContext);
                            return [2 /*return*/, adaptedSearchResponse];
                        case 2:
                            e_1 = _a.sent();
                            console.error(e_1);
                            throw new Error(e_1);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        searchForFacetValues: function (_) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                reject(new Error('SearchForFacetValues is not compatible with Meilisearch'));
                                resolve([]); // added here to avoid compilation error
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
    };
}
/**
 * @param  {AlgoliaMultipleQueriesQuery} searchRequest
 * @param  {Context} options
 * @returns {SearchContext}
 */
function createSearchContext(searchRequest, options) {
    // Split index name and possible sorting rules
    var _a = searchRequest.indexName.split(':'), indexUid = _a[0], sortByArray = _a.slice(1);
    var instantSearchParams = searchRequest.params;
    var searchContext = __assign(__assign(__assign({}, options), instantSearchParams), { sort: sortByArray.join(':') || '', indexUid: indexUid });
    return searchContext;
}
/**
 * @param  {AlgoliaMultipleQueriesQuery} searchRequest
 * @param  {Context} options
 * @returns {SearchContext}
 */
function createPaginationContext(searchContext, params) {
    return {
        paginationTotalHits: searchContext.paginationTotalHits || 200,
        hitsPerPage: searchContext.hitsPerPage === undefined ? 20 : searchContext.hitsPerPage,
        page: (params === null || params === void 0 ? void 0 : params.page) || 0
    };
}

export { instantMeiliSearch };
