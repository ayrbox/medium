import * as React from 'react';
import { css } from '@emotion/core';
const asideStyle = css({
  display: 'none',
  padding: '2em',
  textAlign: 'center',
  background: 'var(--dark-blue)',
  color: 'white',
  position: 'relative',
  '@media (min-width: 1024px)': {
    display: 'unset',
  }
})

const Aside: React.FC = ({ children }) => <div css={asideStyle}>{children}</div>;

export default Aside;
