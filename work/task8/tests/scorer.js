/*
 * This is the scoring script which, when run, tells you how many points you
 * get for your solutions in the file regex.js.
 *
 * You don't have to read or understand this code to solve the task.
 */

class Scorer {

    /**
     * @typedef {{
     *            description: string,
     *            score: number,
     *            maxLength: number,
     *            matches: string[],
     *            skip: string[],
     *            regex: RegExp
     *          }} Solution
     * @typedef {{
     *            string: string,
     *            shouldMatch: boolean,
     *            success: boolean
     *          }} RegexResult
     * @typedef {{}} Reporter
     */

    constructor(reporter) {
        /**
         * @type {string}
         */
        this.indent = '    ';
        /**
         * @type {number}
         */
        this.maxScore = 0;
        /**
         * @type {number}
         */
        this.score = 0;
        /**
         * @type {Reporter}
         */
        this.reporter = reporter;
    }

    /**
     * @param {Solution[]} solutions
     */
    scoreSolutions(solutions) {
        this.computeMaxScore(solutions);

        solutions
            .filter((_, index) => index > 0) // Filter out examples
            .forEach((solution, index) => {
                this.reporter.section(`Regex #${index + 1}: ${solution.description}`);
                this.reporter.report(`Your solution is: "${solution.regex ? solution.regex.source : ''}"`);

                this.scoreSolution(solution);
            });

        this.reportScore();
    }

    /**
     * @param {Solution} solution
     */
    scoreSolution(solution) {
        // Test if regex is defined
        if (!solution.regex) {
            this.reporter.fail(`\n${this.indent}No regex defined.`);

            return;
        }

        // Test if regex is short enough
        if (solution.regex.source.length > solution.maxLength) {
            const oversize = (solution.regex.source.length - solution.maxLength);
            this.reporter.fail(`\n${this.indent}Regex is ${oversize} characters too long. Try to shorten it.`);

            return;
        }

        // Compute results
        const results = this.mapRegexMatch(true, solution.matches, solution.regex)
            .concat(this.mapRegexMatch(false, solution.skip, solution.regex));

        // Test for success
        if (results.every(result => result.success)) {
            this.reporter.success(`Success! Regex is correct. Adding ${solution.score} point${solution.score === 1 ? '' : 's'} to your score.`);
            this.score += solution.score;

            return;
        }

        // Fail code path

        this.reporter.fail(`\n${this.indent}Regex is incorrect.`);

        // Report strings that should have been matched
        this.reportShouldMatch(results);

        // Report strings that should have not been matched
        this.reportShouldNotMatch(results);
    }

    /**
     * @param {*} message
     */
    escape(message) {
        return message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    /**
     * @param {RegexResult[]} results
     */
    reportShouldMatch(results) {
        if (results.some(result => result.shouldMatch && !result.success)) {
            this.reporter.report(`\n${this.indent}Your regex should match the following strings:`);
            results.filter(result => result.shouldMatch)
                .filter(result => !result.success)
                .forEach(result => this.reporter.report(`${this.indent}${this.indent} - ${this.escape(result.string)}`));
        }
    }

    /**
     * @param {RegexResult[]} results
     */
    reportShouldNotMatch(results) {
        if (results.some(result => !result.shouldMatch && !result.success)) {
            this.reporter.report(`\n${this.indent}Your regex should not match the following strings:`);
            results.filter(result => !result.shouldMatch)
                .filter(result => !result.success)
                .forEach(result => this.reporter.report(`${this.indent}${this.indent} - ${this.escape(result.string)}`));
        }
    }

    /**
     * @param {boolean} shouldMatch
     * @param {string[]|object<string,string>} strings
     * @param {RegExp} regex
     * @returns {RegexResult[]}
     */
    mapRegexMatch(shouldMatch, strings, regex) {
        if (!strings) {
            return [];
        }

        if (!Array.isArray(strings)) {
            return Object.keys(strings).map(key => {
                const result = regex.exec(key);

                return {
                    string: `${key}: ${strings[key]}`,
                    shouldMatch,
                    success: !strings[key] || (result && result[1] === strings[key])
                };
            });
        }

        return strings.map(string => ({
            string,
            shouldMatch,
            success: regex.test(string) ? shouldMatch : !shouldMatch
        }));
    }

    /**
     * @param {Solution[]} solutions
     */
    computeMaxScore(solutions) {
        this.maxScore = solutions.reduce((previous, current) => current.score + previous, 0);
    }

    reportScore() {
        this.reporter.section('Summary');
        const scoreReport = `You scored ${this.score} out of ${this.maxScore} possible points.`;

        if (this.score === this.maxScore) {
            this.reporter.success(`${scoreReport} Congratulations!`);
        } else {
            this.reporter.fail(scoreReport);
        }

        this.reporter.finish(this.score);
    }
}

var GlobalScorer = Scorer;
