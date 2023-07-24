import React, { FC } from "react";
import { styled } from "styled-components";

type TProps = {
    onClick: () => void;
    text: string;
};

export const BlueButton: FC<TProps> = ({ onClick, text }) => {
    return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

const StyledButton = styled.button`
    border-radius: 50px;
    height: 53;
    padding: 13px 90px;
    background: #106bd0;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    transition: all 250ms ease;
    &:hover {
        background: #0c59b0;
    }
`;
