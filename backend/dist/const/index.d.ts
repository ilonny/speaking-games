declare enum Colors {
    DARKBLUE = "#7F3CC9",
    PINK = "#E84773",
    ORANGE = "#EEBF38",
    GREEN = "#36BB71",
    BLUE = "#106BD0"
}
type TCard = {
    color: Colors;
    title: string;
    question: string;
    hint?: string;
};
export declare const freeCards: TCard[];
export declare const allCards: TCard[];
export {};
//# sourceMappingURL=index.d.ts.map