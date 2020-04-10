import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';


interface LayoutIndexProps {
  children: React.ReactElement | React.ReactElement[];
}

const LayoutIndex: React.FC<LayoutIndexProps> = ({ children }: LayoutIndexProps): React.ReactElement => (
  <>
    <Helmet>
      <title>EMI Calculator</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="EMI Calculator" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
      />
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Helmet>
    <Global
      styles={css`
        :root {
          --dark-blue: #01048a;
          --text-color: #48536d;
          --menu-width: 5.54%;
          --aside-width: 34%;
        }
        body {
          margin: 0;
          padding: 0;
          background: white;
          color: var(--text-color);
          font-size: calc(1em + 1vw);
          font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
      `}
    />
    <Grid>
      {children}
    </Grid> 
  </>
);

const Grid = styled.div`
  display: grid;
  grid-template-columns: 100% var(--aside-width);
  min-height: 100vh;

  @media (min-width: 1024px) {
    grid-template-columns: auto var(--aside-width);
  }
`;

export default LayoutIndex; 
