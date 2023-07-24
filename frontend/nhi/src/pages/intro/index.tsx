import { Divider, Fade, Flex, ScaleFade } from "@chakra-ui/react";
import { Layout } from "../../components/Layout";
import { ReactComponent as IntroLogo } from "../../assets/images/intro_logo.svg";
import { ReactComponent as GameLogo } from "../../assets/images/game-logo.svg";
import { BlueButton } from "../../components/BlueButton";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Panel } from "../../components/Panel";

export const IntroScreen = () => {
    const [step, setStep] = useState(0);

    const incStep = useCallback(() => {
        setStep((s) => s + 1);
    }, []);

    return (
        <Layout>
            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                height="100%"
                flexDirection={"column"}
            >
                <AbsoluteBlock
                    style={{ pointerEvents: step === 0 ? "auto" : "none" }}
                >
                    <ScaleFade
                        in={step === 0}
                        initialScale={0.8}
                        unmountOnExit
                        style={{
                            width: "100%",
                            maxWidth: "350px",
                            textAlign: "center",
                        }}
                    >
                        <IntroLogo />
                        <Divider height="30px" />
                        <BlueButton text="Играть онлайн" onClick={incStep} />
                    </ScaleFade>
                </AbsoluteBlock>
                <AbsoluteBlock
                    style={{ pointerEvents: step === 1 ? "auto" : "none" }}
                >
                    <ScaleFade
                        in={step === 1}
                        initialScale={0.8}
                        unmountOnExit
                        style={{
                            width: "100%",
                            maxWidth: "350px",
                            textAlign: "center",
                        }}
                    >
                        <Flex justifyContent={"center"}>
                            <GameLogo />
                        </Flex>
                        <Divider height="30px" />
                        <Panel
                            title="Правила игры"
                            description="Участники по очереди вытягивают карты из колоды и вслух читают утверждение. Каждый игрок должен прореагировать на услышанную фразу. Все, у кого хоть раз в жизни был подобный опыт – делятся историями, как это было."
                            hint={`В игре нет победителей\nи проигравших. Она закончится, когда участники этого захотят.`}
                        />
                        <Divider height={20} />
                        <Flex justifyContent={"center"}>
                            <Link to={"/game"}>
                                <BlueButton text="ИГРАТЬ" onClick={() => {}} />
                            </Link>
                        </Flex>
                    </ScaleFade>
                </AbsoluteBlock>
            </Flex>
        </Layout>
    );
};

const AbsoluteBlock = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
