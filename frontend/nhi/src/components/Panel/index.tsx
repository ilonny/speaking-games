import { Divider, Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { styled } from "styled-components";

type TPops = {
    backgroundColor?: string;
    textColor?: string;
    title: string;
    description?: string;
    hint?: string;
};

export const Panel: FC<TPops> = ({
    backgroundColor = "#fff",
    textColor = "#000",
    title,
    description,
    hint,
}) => {
    return (
        <Wrapper style={{ backgroundColor }}>
            <Flex
                flexDirection={"column"}
                justifyContent={"space-between"}
                style={{
                    position: "absolute",
                    height: "100%",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "50px 30px",
                }}
            >
                <div>
                    <Title>{title}</Title>
                    {description && (
                        <>
                            <Divider height={20} />
                            <Description>{description}</Description>
                        </>
                    )}
                </div>
                {hint && <Hint>{hint}</Hint>}
            </Flex>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: #fff;
    border-radius: 20px;
    min-height: 515px;
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    text-align: left;
`;

const Title = styled.h1`
    font-weight: 600;
`;

const Description = styled.p`
    line-height: 22px;
    font-size: 16px;
`;

const Hint = styled.p`
    line-height: 22px;
    font-size: 16px;
`;
