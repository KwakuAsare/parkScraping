// importing libraries
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('terminalOccupancyData.csv');

// Generate database file
writeStream.write(`Terminal A,Terminal B,Terminal C/D \n`);

var minutes = 30, timerInerval = minutes * 60 * 1000;