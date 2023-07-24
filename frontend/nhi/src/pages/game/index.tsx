import React from "react";
import { Layout } from "../../components/Layout";
import { Flex } from "@chakra-ui/react";

export const GameScreen = () => {
    return (
        <Layout>
            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                height="100%"
                flexDirection={"column"}
            >
                <h1>Game Screen</h1>
            </Flex>
        </Layout>
    );
};
