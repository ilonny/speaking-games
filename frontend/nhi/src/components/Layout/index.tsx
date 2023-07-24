import { FC } from "react";
import { styled } from "styled-components";

type TProps = {
    children: JSX.Element;
};

export const Layout: FC<TProps> = ({ children }) => {
    return <Container>{children}</Container>;
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: 980px;
    margin: 0 auto;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f3f3f3;
`;
