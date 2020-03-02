const _ = require('highland');
const fs = require('fs');
const csv = require('csv-parser');
const es = require('elasticsearch');
const INDEX_NAME = 'demo_es_index';

const start = async () => {
  const client = new es.Client({
    host: 'localhost:9200',
  });

  await client.ping({
    requestTimeout: 3000,
  }, function(err) {
    if (err) {
      console.trace('Elasitic search cluster is down!');
    } else {
      console.log('Elastic search cluster is running.');
    }
  });


  try {
    await client.indices.create({ index: INDEX_NAME })
    console.log('Created Index');
  } catch(e) {
    if(e.status === 400) {
      console.log('Index already exists.');
    } else {
      throw e;
    }
  }


  // Processing file
  let currentIndex = 0;
  const stream = _(
    fs.createReadStream('./data/planet-latest_geonames.tsv').pipe(
      csv({
        separator: '\t'
      }),
    )
  ).map(data => ({
    ...data,
    alternative_names: data.alternative_names.split(','),
    lon_num: parseFloat(data.lon),
    lat_num: parseFloat(data.lat),
    place_rank_num: parseInt(data.place_rank, 10),
    importance_num: parseFloat(data.importance),
  })).map(data => [{
    index: {_index: INDEX_NAME, _type: 'place', _id: data.osm_id },
    data,
  }])
  .batch(100)
  .each(async entires => {
    stream.pause();
    const body = entires.reduce((acc, val) => acc.concat(val), []);
    await client.bulk({ body });
    currentIndex += 100;
    console.log('Created index : ', currentIndex);
    stream.resume();
  }).on('end', () => {
    console.log('Done');
    process.exit();
  });
};

start();