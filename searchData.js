const es = require('elasticsearch');
const INDEX_NAME = 'demo_es_index';
const query = 'Lewisham';


const searchData = async() => {
  const client = new es.Client({
    host: 'localhost:9200',
  });

  // Check Connection
  await client.ping({
    requestTimeout: 3000,
  }, function(err) {
    if (err) {
      console.trace('Elastic Search cluster is down!');
    } else {
      console.log('Elastic search is running');
    }
  });


  try {
    const resp = await client.search({
      index: INDEX_NAME,
      type: 'place',
      body: {
        sort: [{
          place_rank_num: { order: 'desc' },
        }, {
          importance_num: { order: 'desc'},
        }],
        query: {
          bool: {
            should: [{
              match: {
                lat: '51.4624325',
              }
            }, {
              match: {
                alternative_name: query
              },
            }]
          },
        },
      }
    }); 
    const { hits } = resp.hits;
    console.log('hits', hits);
  } catch(e) {
    if(e.status === 404) {
      console.log('Index not found');
    } else {
      throw e;
    }
  }
}

searchData();