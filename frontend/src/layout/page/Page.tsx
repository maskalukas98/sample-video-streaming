import React from "react";
import styled from "styled-components";

const StyledRootDiv = styled.div`
    height: 100%;
    background-color: #1f1f1f;
`

const StyledContentDiv = styled.div`
    height: 100%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    display: flex;
    align-items: center;
    justify-content: center;
`

type Props = {
    children: React.ReactNode;
}

export const Page = (props: Props) => {
    return <StyledRootDiv>
        <StyledContentDiv>
            { props.children }
        </StyledContentDiv>
    </StyledRootDiv>
}