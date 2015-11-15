var program = require('commander');

program
  .version(require('../package.json').version)
  .usage('<file ...> [options]')
  .option('-j, --json', 'Display the output in json format')
  .parse(process.argv);


var exifCLI = require('./exif-cli');

// Get all the files.
var files = program.args;

// Parse and print each file.
files.forEach(exifCLI.parseFile);
