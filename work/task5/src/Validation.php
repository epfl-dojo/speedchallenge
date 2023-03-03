<?php
/**
 * ICTSkills 2020 — Trade 17 — Web Technologies
 *
 * Speed challenge — Task 5 — Data Validation
 */

/**
 * Validation
 */
class Validation
{
    /**
     * Validates if an input has at least the specified length or value.
     *
     * If the input is a string, the length should be checked (is string length at least $min).
     * If the input is a number, the numeric value should be checked (is number at least $min).
     *
     * @param   mixed   $input  The input data
     * @param   int     $min    Minimum length or value
     * @return  boolean         Whether a valid value was provided or not
     */
    public static function min($input, int $min)
    {
        // @todo
    }

    /**
     * Validates if an input has at most the specified length or value.
     *
     * If the input is a string, the length should be checked (is string length at most $max).
     * If the input is a number, the numeric value should be checked (is number at most $max).
     *
     * @param   mixed   $input  The input data
     * @param   int     $max    Maximum length or value
     * @return  boolean         Whether a valid value was provided or not
     */
    public static function max($input, int $max)
    {
        // @todo
    }

    /**
     * Validates if an input is already in a provided set of values.
     *
     * If the input is already in the $existingValues array, false should be returned and true otherwise.
     *
     * @param   mixed   $input          The input data
     * @param   array   $existingValues Array to check input against
     * @return  boolean                 Whether a valid value was provided or not
     */
    public static function unique($input, array $existingValues)
    {
        // @todo
    }

    /**
     * Validates an input against multiple rules.
     *
     * The rules array has the following structure:
     * [
     *     ['min', 2],
     *     ['max', 20],
     *     ['unique', ['js', 'php']]
     * ]
     *
     * So it contains arrays where the first element (e.g. 'min') is the name of the rule
     * and the second element (e.g. 2) the parameter of the rule ($min in this case).
     *
     * You can assume that only existing rules are passed in and the rule parameters have the correct types.
     *
     * @param   mixed   $input  The input data
     * @param   array   $rules  Validation rules to check input against
     * @return  boolean         Whether a valid value was provided or not
     */
    public static function multiple($input, array $rules)
    {
        // @todo
    }
}
