const fs = require('fs');
const es = require('event-stream');
const now = require('performance-now');

const FILE_NAME = 'data-file.csv';
var totalLines = 0;

console.time('line count');

var s = fs
  .createReadStream(FILE_NAME)
  .pipe(es.split())
  .pipe(
    es.mapSync(function(line) {
        totalLines++;
        var keys = line.split(',');
        console.log('keys', keys);
      })
      .on('error', function(err) {
        console.log('Error while reading file.', err);
      })
      .on('end', function() {
        console.log('Read entire file.');
        t1 = now();
        console.log(totalLines);
        console.timeEnd('line count');
        console.log(
          `Performance now line count timing: ` + (t1 - t0).toFixed(3) + `ms`,
        );
    }),
  );