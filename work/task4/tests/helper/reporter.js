const Base = require('mocha/lib/reporters/base');
const constants = require('mocha/lib/runner').constants;
const EVENT_TEST_END = constants.EVENT_TEST_END;
const EVENT_RUN_END = constants.EVENT_RUN_END;

// load test config
const config = require('../../config.json');

/**
 * Expose `JSON`.
 */

exports = module.exports = JSONReporter;

/**
 * Constructs a new `JSON` reporter instance.
 *
 * @public
 * @class JSON
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */
function JSONReporter(runner, options) {
    Base.call(this, runner, options);

    const normalTests = {};
    const extraTests = {};

    runner.on(EVENT_TEST_END, function (test) {
        const suite = getSuite(test);

        const tests = suite.extra ? extraTests : normalTests;

        if (!tests[suite.name]) {
            tests[suite.name] = {};
        }

        if (tests[suite.name][test.title]) {
            throw new Error(`Duplicated test name: ${test.title}`);
        }

        tests[suite.name][test.title] = test.state === 'passed';
    });

    runner.once(EVENT_RUN_END, function () {
        const result = {};

        Object.keys(normalTests).forEach(criterium => {
            if (!config.criteria[criterium]) {
                console.error(`Error: Criterium "${criterium}" not found in config.json`);
            } else {
                // check if the extra test failed and needs manual review
                if (Object.keys(extraTests).length > 0) {
                    const tests = Object.keys(normalTests[criterium]);
                    for (let i = 0; i < tests.length; i++) {
                        if (typeof extraTests[criterium] === 'undefined' || typeof extraTests[criterium][tests[i]] === 'undefined') {
                            console.error(`Error: Test "${criterium} > ${tests[i]}" does not have an extra test`);
                        } else if (normalTests[criterium][tests[i]] === true && extraTests[criterium][tests[i]] !== true) {
                            result[criterium] = 'manual_check';
                            return;
                        }
                    }
                }

                const numFailed = Object.values(normalTests[criterium]).filter(result => result === false).length;

                if (typeof config.criteria[criterium].deduct === 'number') {
                    result[criterium] = Math.max(0, config.criteria[criterium].points - numFailed * config.criteria[criterium].deduct);
                } else {
                    result[criterium] = numFailed === 0 ? config.criteria[criterium].points : 0;
                }
            }
        });

        runner.testResults = result;

        console.log(JSON.stringify(result, undefined, 4));
    });
}

/**
 * Get the suite name of a test
 *
 * @param {Object} test
 */
function getSuite(test) {
    if (test.parent && !test.parent.root) {
        return getSuite(test.parent);
    }

    return {
        name: test.title.replace(/\s*extra$/i, ''),
        extra: !!(test.title.match(/extra$/i)),
    };
}

JSONReporter.description = 'single JSON object';
