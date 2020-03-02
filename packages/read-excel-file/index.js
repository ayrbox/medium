const xlsx = require('read-excel-file/node');

const readExcelFile = async () => {
  try {
    const rows = await xlsx('./data.xlsx');

    /**
     * Print data as it is
     */
    console.log(rows);

    /**
     * Print entire data in table format
     */
    console.table(rows);


    rows.forEach((col) => {
      col.forEach((data) => {
        console.log(typeof data, data);
      })
    });

    
  } catch(err) {
    console.log('Error reading data from excel file.');
  }
} 


readExcelFile();
