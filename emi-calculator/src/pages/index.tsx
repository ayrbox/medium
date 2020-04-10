import * as React from 'react'
import LoanContextProvider from '../contexts/LoanContext'
import TestComponent from '../components/TestComponent'

import Layout from '../layouts';
import {
  Main,
  Aside,
  LoanMain,
} from '../components';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

export default class extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context)
  }
  public render() {
    return (
      <LoanContextProvider>
        <Layout>
          <Main>
            <LoanMain />
            <h1>Hello EMI Calculator</h1>
            <TestComponent />
          </Main>
          <Aside>
            Secondary Place holder
          </Aside>
        </Layout>
      </LoanContextProvider>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
