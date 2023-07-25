enum Colors {
    DARKBLUE = "#7F3CC9",
    PINK = "#E84773",
    ORANGE = "#EEBF38",
    GREEN = "#36BB71",
    BLUE = "#106BD0",
}
type TCard = {
    backgroundColor: string;
    title: string;
    textColor: string;
    question: string;
    hint?: string;
};

export const freeCards: TCard[] = [
    {
        backgroundColor: "#7F3CC9",
        textColor: "#E6D0FE",
        title: "Never have I ever lied to get out of going to work",
        question: "What did you say?",
        hint: "Get out off – отлынивать; избавиться",
    },
    {
        backgroundColor: "#E7497E",
        textColor: "#FFD2E2",
        title: "Never have I ever lied on a dating app",
        question: "What did you lie about?",
    },
    {
        backgroundColor: "#FFCD00",
        textColor: "#fff",
        title: "Never have I ever snooped through my partner’s phone",
        question:
            "Did you do it because suspected your partner cheating or lying?",
        hint: "Snoop through a phone – копаться в телефоне",
    },
];

export const allCards: TCard[] = [];
