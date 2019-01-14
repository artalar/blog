import React from "react";
import styled from "styled-components";
import { Notes } from "mdx-deck";

const FixFont = styled.div`
  font-size: ${({ size = 0.6 }) => size}rem;
  overflow: auto;
  max-height: 33vh;
`;

export default ({ children, size }) => (
  <Notes>
    <FixFont size={size}>{children}</FixFont>
  </Notes>
);
