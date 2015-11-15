'use strict';

const chalk = require('chalk');
const ExifImage = require('exif').ExifImage;

/**
 * Display the data in JSON format.
 * @param  {Object} exifData
 */
const printJSON = (exifData) => {
  console.log(exifData);
};

/**
 * `printRichData` helper for printing the headers.
 * @param  {String} header
 */
const printRichDataHeader = (header) => {
  // Display a break line before each header.
  console.log();

  console.log(chalk.green(header));
};

/**
 * `printRichData` helper for printing the values.
 * @param  {String} key
 * @param  {String} val
 */
const printRichDataValue = function(key, val) {
  if (key) {
    console.log(`  ${chalk.blue(key)}: ${val}`);
  }
};

/**
 * Display the EXIF data in a nice format.
 * @param  {Object} exifData
 */
const printRichData = function(exifData) {

  // Iterate over all the attributes.
  for (let lvl1 in exifData) {
    // Only display headers that have values.
    if (Object.keys(exifData[lvl1]).length > 0) {
      // Display the header.
      printRichDataHeader(lvl1);

      // Iterate over all the values.
      for (let lvl2 in exifData[lvl1]) {
        // Display the value.
        printRichDataValue(lvl2, exifData[lvl1][lvl2]);
      }
    }
  }
};

/**
 * Get and display the EXIF data from the file.
 * @param  {String} file
 * @param  {Boolean} displayJSON (Optional) `false` as default.
 */
const parseFile = (filePath, displayJSON) => {
  // Do not display json as default.
  displayJSON = false || displayJSON;

  try {
    new ExifImage({ image : filePath }, function (error, exifData) {
        // Display if there is any error.
        if (error) {
          return console.log(`Error: ${error.message}`);
        }

        // Display in JSON format if requested.
        if (displayJSON) {
          return printJSON(exifData);
        }

        // Display reach format as default.
        printRichData(exifData);
    });

  // Display if there is any error.
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }

  // Display a line break.
  console.log();
};

module.exports = {
  printJSON: printJSON,
  printRichData: printRichData,
  parseFile: parseFile
};
