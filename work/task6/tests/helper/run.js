const path = require('path');
const { exec } = require('child_process');
const express = require('express');
const chalk = require('chalk');

const app = express();
const port = 3000;
const json = process.env.FORMAT === 'json';

app.use(express.static(path.resolve(__dirname, '..', '..', 'src')));
app.use('/lib', express.static(path.resolve(__dirname, '..', '..', 'lib'), { maxAge: '60s' }));
app.listen(port, () => {
    if (!json) {
        console.log(`Website available at ${chalk.blueBright(`http://localhost:${port}\n`)}`);
    }

    const command = json
        ? `$(npm bin)/cypress run --quiet --browser chrome --headless --reporter ${path.resolve(__dirname, '..', '..', 'tests', 'helper', 'reporter.js')}`
        : 'FORCE_COLOR=1 $(npm bin)/cypress open';

    const cypress = exec(command, { cwd: path.resolve(__dirname, '..', '..') });

    cypress.on('exit', (code) => process.exit(code));
    cypress.stdout.pipe(process.stdout);
    cypress.stderr.pipe(process.stderr);
}).on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
        console.error(chalk.red(`ERROR: Unable to start webserver because port ${port} is already in use!`));
        console.error('Please make sure you don\'t already have same command running in the background and close all your terminal windows.');
    } else {
        console.error(err);
    }
});;
