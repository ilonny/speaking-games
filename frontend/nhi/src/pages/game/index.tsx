// @ts-nocheck
import React, { useMemo, useRef, useState } from "react";
import { Layout } from "../../components/Layout";
import { Divider, Flex } from "@chakra-ui/react";
import { ReactComponent as Logo } from "../../assets/images/game-logo-sg.svg";
import { freeCards as db } from "../../constants";
import TinderCard from "react-tinder-card";
import { Panel } from "../../components/Panel";
import { BlueButton } from "../../components/BlueButton";

export const GameScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(db.length - 1);
    const [lastDirection, setLastDirection] = useState();
    const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(db.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    );

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canGoBack = currentIndex < db.length - 1;

    const canSwipe = currentIndex >= 1;

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    };

    const outOfFrame = (name, idx) => {
        console.log(
            `${name} (${idx}) left the screen!`,
            currentIndexRef.current
        );
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    };

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < db.length) {
            await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
        }
    };

    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return;
        const newIndex = currentIndex + 1;
        updateCurrentIndex(newIndex);
        await childRefs[newIndex].current.restoreCard();
    };

    console.log("currentIndex", currentIndex);

    return (
        <Layout>
            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                minHeight="100%"
                flexDirection={"column"}
            >
                <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    minHeight="100%"
                    // maxHeight={"900px"}
                    flexDirection={"column"}
                >
                    <Logo />
                    <Divider height={20} />
                    <div>
                        <div className="cardContainer">
                            {db.map((card, index) => (
                                <TinderCard
                                    ref={childRefs[index]}
                                    className="swipe"
                                    key={card.title}
                                    onSwipe={(dir) =>
                                        swiped(dir, card.title, index)
                                    }
                                    onCardLeftScreen={() =>
                                        outOfFrame(card.title, index)
                                    }
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            maxWidth: "350px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Panel {...card}></Panel>
                                    </div>
                                </TinderCard>
                            ))}
                        </div>
                        {/* <div className="buttons">
                            <button
                                style={{
                                    backgroundColor: !canSwipe && "#c3c4d3",
                                }}
                                onClick={() => swipe("left")}
                            >
                                Swipe left!
                            </button>
                            <button
                                style={{
                                    backgroundColor: !canGoBack && "#c3c4d3",
                                }}
                                onClick={() => goBack()}
                            >
                                Undo swipe!
                            </button>

                            <button
                                style={{
                                    backgroundColor: !canSwipe && "#c3c4d3",
                                }}
                                onClick={() => swipe("right")}
                            >
                                Swipe right!
                            </button>
                        </div> */}
                        {/* {lastDirection ? (
                            <h2 key={lastDirection} className="infoText">
                                You swiped {lastDirection}
                            </h2>
                        ) : (
                            <h2 className="infoText">
                                Swipe a card or press a button to get Restore
                                Card button visible!
                            </h2>
                        )} */}
                    </div>
                    <Divider height={0} />
                    {canSwipe ? (
                        <div
                            justifyContent={"center"}
                            align="center"
                            flexWrap={"wrap"}
                        >
                            <BlueButton
                                text="Следующая карта"
                                onClick={() => swipe("right")}
                            />
                            <Divider width={10} height={10} />
                            <button
                                onClick={() => goBack()}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    color: "#747474",
                                    cursor: "pointer",
                                    textAlign: "center",
                                    width: "100%",
                                }}
                            >
                                {"Предыдущая"}
                            </button>
                        </div>
                    ) : (
                        <div
                            justifyContent={"center"}
                            align="center"
                            flexWrap={"wrap"}
                        >
                            <Divider width={10} height={10} />
                            <p
                                style={{
                                    textAlign: "center",
                                    fontWeight: 400,
                                    margin: 0,
                                }}
                            >
                                Демо-версия игры подошла к концу.
                                <br />
                                Вы можете открыть доступ ко всей колоде (80
                                карточек) за 399₽
                            </p>
                            <Divider width={10} height={10} />
                            <BlueButton
                                text="ОТКРЫТЬ ДОСТУП (399₽)"
                                onClick={() => swipe("right")}
                            />
                            <Divider width={10} height={10} />
                            <a href="">КУПИТЬ ПЕЧАТНУЮ ВЕРСИЮ</a>
                        </div>
                    )}
                    <Divider height={30} />
                </Flex>
            </Flex>
        </Layout>
    );
};
