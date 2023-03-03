/**
 * Used to print score results in a HTML page.
 */
class HtmlReporter {

    constructor() {
        this.container = document.getElementById('test-results');
    }

    /**
     * @param {*} message
     * @param {*} optionalParams
     */
    report(message, ...optionalParams) {
        if (optionalParams.length > 0) {
            this.container.innerHTML += message + ' ' + optionalParams.join(' ') + '\n';
        } else {
            this.container.innerHTML += message + '\n';
        }
    }

    /**
     * @param {string} message
     */
    section(message) {
        const line = '<hr>';
        this.report(`\n${line}\n<strong>${message}</strong>`);
    }

    /**
     * @param {string} message
     */
    fail(message) {
        this.report(`<span style="color: red;">${message}</span>`);
    }

    /**
     * @param {string} message
     */
    success(message) {
        this.report(`<span style="color: green;">${message}</span>`);
    }

    finish(score) {

    }
}
