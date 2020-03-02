const es = require('elasticsearch');
const INDEX_NAME = 'demo_es_index';

const deleteIndex = async() => {
  const client = new es.Client({
    host: 'localhost:9200',
  });


  await client.ping({
    requestTimeout: 3000,
  }, function(err) {
    if(err) {
      console.trace('ES cluster is down');
    } else {
      console.log('ES is running');
    }
  });

  try {
    await client.indices.delete({ index: INDEX_NAME });
    console.log('All index is deleted');
  } catch (e) {
    if(e.status === 404) {
      console.log('Index not found.');
    } else {
      throw e;
    }
  }
};

deleteIndex();
