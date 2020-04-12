const xlsx = require('read-excel-file/node');

/**
 * Read data from default Sheet
 */
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


/**
 * Read Sheet Infomrations
 */
const readSheets = async () => {
  const sheets = await xlsx('./data.xlsx', { getSheets: true });

  sheets.forEach(sheetName => {
    console.log('Sheet Name', sheetName);
  });
}

readSheets();


/**
 * Read data from specified sheet (by Name or index)
 */

const readSheetData = async (sheetInfo) => {
  const rows = await xlsx('./data.xlsx', { sheet: sheetInfo });
  console.log(`Data from Sheet - "${sheetInfo}"`);
  console.log(JSON.stringify(rows));
}
// readSheetData('Worksheet');
readSheetData(1);
