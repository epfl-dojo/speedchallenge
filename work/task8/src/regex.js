/**
 * ICTSkills 2020 — Trade 17 — Web Technologies
 *
 * Speed challenge — Task 8 — Regex
 */

/*
 * Regex
 *
 * Write your solutions into the "regex" property of each sub task.
 * Do not alter anything else in this file.
 *
 * To test your solution, you can open the test page linked in the task description.
 */

var regex = {
    solutions: [
        // Regex #0: Example
        // THIS IS AN EXAMPLE
        {
            description: "Example",

            // The amount of points you get for this regex
            score: 0,

            // The maximum length the regex can be. If it's longer, there will be no points awarded.
            maxLength: 4,

            // The regex must match these strings using RegExp.prototype.test
            matches: ["a", "b"],

            // The regex must not match these strings
            skip: ["c"],

            // Write your regex here
            regex: /[ab]/
        },

        // -----------------------------------------
        // TODO:
        // Sub tasks that will be marked start here.

        // Regex #1
        {
            description: "Numbers 3 to 8",
            score: 0.5,
            maxLength: 5,
            matches: ["3", "4", "5", "6", "7", "8"],
            skip: ["0", "1", "2", "9"],
            regex: /TODO/ // TODO
        },

        // Regex #2
        {
            description: "Three or more words",
            score: 0.5,
            maxLength: 10,
            matches: ["Swiss Skills 2020", "web technologies speed challenge", "JS Beginner Course", "PHP 4 Dummies"],
            skip: ["switzerland", "google.com", "Swiss Skills", "JS PHP", "Beginner Course"],
            regex: /TODO/ // TODO
        },

        // Regex #3
        {
            description: "Markdown titles",
            score: 0.5,
            maxLength: 10,
            matches: ["# Bohemian Rhapsody", "##  Is this the real life?", "### Is this just fantasy?", "#### Caught in a landslide", "##### No escape from reality", "###### Open your eyes"],
            skip: ["#ictskills2020", "Good year #2020", "####### I heard that there are 7 headings?", "Changed: ### test to: test"],
            regex: /TODO/ // TODO
        },

        // Regex #4
        {
            description: "Dates",
            score: 0.5,
            maxLength: 40,
            matches: ["12.09.2020", "12.09.2020 16:00", "01.01.1970 00:00", "12.12.2012 12:12", "31.01.2012 08:05"],
            skip: ["12a12.2020", "12.12a2020 16:00", "12.9.2020", "12.9.20", "1.12.2020", "12.01.2020T10:10", "12.09.2020 9:33", "12.09.2020 12:5", "12.09.2020 12:", "12.09.2020   16:00"],
            regex: /TODO/ // TODO
        },

        // Regex #5
        {
            description: "HTML Tags",
            score: 1,
            maxLength: 50,
            matches: ["<p>lorem ipsum</p>", "<a href=\"https://google.com\">google.com</a>", "<span class=\"tag\" data-tooltip=\"create account\">register</span>"],
            skip: ["<p>hello world", "< p>invalid</p>", "<p>invalid 2< /p>", "<p>invalid 3</ p>", "<div class=\"container\" non-closing tag</div>"],
            regex: /TODO/ // TODO
        },
    ]
};
