enum Colors {
    DARKBLUE = "#7F3CC9",
    PINK = "#E84773",
    ORANGE = "#EEBF38",
    GREEN = "#36BB71",
    BLUE = "#106BD0",
}
type TCard = {
    color: Colors;
    title: string;
    question: string;
    hint?: string;
};

export const freeCards: TCard[] = [
    {
        color: Colors.DARKBLUE,
        title: "Never have I ever lied to get out of going to work",
        question: "What did you say?",
        hint: "Get out off – отлынивать; избавиться",
    },
    {
        color: Colors.DARKBLUE,
        title: "Never have I ever lied on a dating app",
        question: "What did you lie about?",
    },
    {
        color: Colors.DARKBLUE,
        title: "Never have I ever snooped through my partner’s phone",
        question:
            "Did you do it because suspected your partner cheating or lying?",
        hint: "Snoop through a phone – копаться в телефоне",
    },
];

export const allCards: TCard[] = [];
