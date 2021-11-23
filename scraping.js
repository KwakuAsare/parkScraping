// importing libraries
//const request = require('request');
//const cheerio = require('cheerio');
//const writeStream = fs.createWriteStream('terminalOccupancyData.csv');
//const { BigQuery } = require('@google-cloud/bigquery');
const puppeteer = require('puppeteer')
const fs = require('fs').promises;

// Generate database file with fs writestrean
//writeStream.write(`Terminal A,Terminal B,Terminal C/D \n`);

//setting a time interval for scraping
//var minutes = 30, timerInerval = minutes * 60 * 1000;

// Function to scrap Laguardia Parking Occupancy data after every 30 minutes
// function TerminalOccupancyData() {

//   //  Scraping using requst npm
//   request('https://www.laguardiaairport.com/to-from-airport/parking', (error, response, html) => {
//     // Check there is no error
//     if (!error && response.statusCode == 200) {
//       // using cheerio library to load the website page html
//       const $ = cheerio.load(html);

//       $('.terminal-left').each((div, el) => {
//         // Find the element using the class
//         const terminalA = $(el)
//           .find('.terminal-percentage')
//           .text()
//           .replace(/% Full/, '');

//         const terminalB = $(el)
//           .find('.terminal-percentage')
//           .text()
//           .replace(/% Full/, '');

//         const terminalCD = $(el)
//           .find('.terminal-percentage')
//           .text()
//           .replace(/% Full/, '');

//         // Export to file to upload to database
//         writeStream.write(`${terminalA},${terminalB},${terminalCD} \n`);
//       });

//       console.log('\nTerminal Data scraped ... \n');
//     }

//   });


// }
// // Run script after every 30 minutes
// setInterval(TerminalOccupancyData, timerInerval);

////////////////////////////////////////////////////////////////////

// Alternatively using puppeteer and writing to a json

async function start() {

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto("https://www.laguardiaairport.com/to-from-airport/parking")

  const terminalOccupancy = await page.evaluate(() => {
    // collect into an array
    return Array.from(document.querySelectorAll("#parkingContent > div:nth-child(1)")).map(x => x.textContent)
  })

  await fs.writeFile("terminal_occupacy.json", terminalOccupancy.join("\r\n"))

  await browser.close()

}

start()

var minutes = 1, timerInerval = minutes * 60 * 1000;
// Run the Main function every 30 minutes
function scrapeTerminalOccupancyData() {
  // The main function
  start()
}
setInterval(scrapeTerminalOccupancyData, timerInerval);