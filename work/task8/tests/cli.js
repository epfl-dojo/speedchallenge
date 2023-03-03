/*
 * Score regex results with node. (in case web version does not work).
 *
 * Usage:
 * node ./cli.js
 */

const fs = require('fs');
eval(fs.readFileSync(__dirname + '/regex-original.js').toString());
eval(fs.readFileSync(__dirname + '/../src/regex.js').toString());
eval(fs.readFileSync(__dirname + '/console-reporter.js').toString());
eval(fs.readFileSync(__dirname + '/scorer.js').toString());

// Execute
(new GlobalScorer(new GlobalConsoleReporter())).scoreSolutions(regex.solutions);
