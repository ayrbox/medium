import * as React from 'react';
import styled from '@emotion/styled';

const Aside: React.FC = ({ children }) => <div css={Styled}>{children}</div>;

const Styled = styled.aside`
  display: none;
  padding: 2em;
  text-align: center;
  background: var(--dark-blue);
  color: white;
  position: relative;

  @media (min-width: 1024px) {
    display: unset;
  }
`;


export default Aside;
