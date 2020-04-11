import * as React from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LoanContextProvider from '../contexts/LoanContext'
import DateFnsUtils from '@date-io/date-fns';
import enGB from 'date-fns/locale/en-GB';

import Layout from '../layouts';
import {
  Main,
  Aside,
  AsideMain,
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
      <Layout>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          locale={enGB}>
          <LoanContextProvider>
            <Main>
              <LoanMain />
            </Main>
            <Aside>
              <AsideMain />
            </Aside>
          </LoanContextProvider>
        </MuiPickersUtilsProvider>
      </Layout>
    );
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
