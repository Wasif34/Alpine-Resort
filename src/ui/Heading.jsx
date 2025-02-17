import styled, { css } from "styled-components";

const test = css`
  text-align: center;
`;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      color: var(--color-grey-500);
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      color: var(--color-grey-500);
      font-size: 2rem;
      font-weight: 500;
    `}
      
      ${(props) =>
    props.as === "h4" &&
    css`
      color: var(--color-grey-500);
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
  line-height: 1.4
`;

export default Heading;
