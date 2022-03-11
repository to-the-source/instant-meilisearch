export declare function resolveHighlightValue(value: any, preTag?: string, postTag?: string): {
    value: string;
} | Array<{
    value: string;
}>;
/**
 * @param  {Record<string} formattedHit
 * @param  {string} highlightPreTag?
 * @param  {string} highlightPostTag?
 * @returns {Record}
 */
export declare function adaptHighlight(hit: Record<string, any>, preTag?: string, postTag?: string): Record<string, any>;
//# sourceMappingURL=highlight-adapter.d.ts.map