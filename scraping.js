// importing libraries
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('terminalOccupancyData.csv');
//const { BigQuery } = require('@google-cloud/bigquery');

// Generate database file with fs writestrean
writeStream.write(`Terminal A,Terminal B,Terminal C/D \n`);

//setting a time interval for scraping
var minutes = 1, timerInerval = minutes * 60 * 1000;

// Function to scrap Laguardia Parking Occupancy data after every 30 minutes
function TerminalOccupancyData() {

  //  Scraping using requst npm
  request('https://www.laguardiaairport.com/to-from-airport/parking', (error, response, html) => {
    // Check there is no error
    if (!error && response.statusCode == 200) {
      // using cheerio library to load the website page html
      const $ = cheerio.load(html);

      $('.terminal-left').each((span, el) => {
        // Find the element using the class
        const terminalA = $(el)
          .find('.terminal-percentage')
          .text()
          .replace(/% Full/, '');

        const terminalB = $(el)
          .find('.terminal-percentage')
          .text()
          .replace(/% Full/, '');

        const terminalCD = $(el)
          .find('.terminal-percentage')
          .text()
          .replace(/% Full/, '');

        // Export to file to upload to database
        writeStream.write(`${terminalA},${terminalB},${terminalCD} \n`);
      });

      console.log('\nTerminal Data scraped ... \n');
    }

  });


}
// Run script after every 30 minutes
setInterval(TerminalOccupancyData, timerInerval);