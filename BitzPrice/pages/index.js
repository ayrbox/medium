import Fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Prices from '../components/Prices';

const Index = ({ data }) => (
  <Layout>
    <h1>Welcome to BitzPrice</h1>
    <p>Check current Bitcoin rates</p>
    <Prices data={data} />
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await Fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
  const data = await res.json();

  return {
    data
  }
}

export default Index; 
