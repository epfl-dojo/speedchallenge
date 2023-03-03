// Execute

/**
 * Insert the solution regex values into the original regex exercise
 *
 * A.k.a. avoid hacking ;)
 */
regexOriginal.solutions.forEach((solution, index) => {
    regexOriginal.solutions[index].regex = regex.solutions[index].regex;
});

// execute the tests
(new Scorer(new HtmlReporter())).scoreSolutions(regexOriginal.solutions);
