/**
 * Used to score the points in a CLI environment.
 */
class ConsoleReporter {
    /**
     * @param {*} message
     * @param {*} optionalParams
     */
    report(message, ...optionalParams) {

    }

    /**
     * @param {string} message
     */
    section(message) {

    }

    /**
     * @param {string} message
     */
    fail(message) {

    }

    /**
     * @param {string} message
     */
    success(message) {

    }

    finish(score) {
        console.log(JSON.stringify({ regex: score }, undefined, 4));
    }
}

var GlobalConsoleReporter = ConsoleReporter;
