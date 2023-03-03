<?php

namespace Trade17\Tests;

use Validation;
use Trade17\Tests\Helper\BaseTest;

class ValidationTest extends BaseTest
{
    /**
     * @medium
     */
    public function testValidationMin(): void
    {
        // test with a string
        $this->assertFalse(Validation::min('hello', 6));
        $this->assertTrue(Validation::min('hello', 5));
        $this->assertTrue(Validation::min('hello world', 5));

        // test with a number
        $this->assertFalse(Validation::min(6, 10));
        $this->assertTrue(Validation::min(10, 10));
        $this->assertTrue(Validation::min(3488175, 10));
    }

    /**
     * @medium
     */
    public function testValidationMax(): void
    {
        // test with a string
        $this->assertFalse(Validation::max('hello', 4));
        $this->assertTrue(Validation::max('hello', 5));
        $this->assertTrue(Validation::max('h', 5));

        // test with a number
        $this->assertFalse(Validation::max(15, 10));
        $this->assertTrue(Validation::max(10, 10));
        $this->assertTrue(Validation::max(0, 10));
    }

    /**
     * @medium
     */
    public function testValidationUnique(): void
    {
        $this->assertTrue(Validation::unique('hello', ['world', 'foo', 'bar']));
        $this->assertTrue(Validation::unique('hello', ['world', 'HELLO', 'foo', 'bar']));
        $this->assertFalse(Validation::unique('world', ['hello', 'my', 'nice', 'world', 'foo', 'bar']));
    }

    /**
     * @medium
     */
    public function testValidationMultiple(): void
    {
        $this->assertTrue(Validation::multiple('hello', [['min', 5]]));
        $this->assertFalse(Validation::multiple('hello', [['min', 6]]));
        $this->assertTrue(Validation::multiple('hello', [['max', 5]]));
        $this->assertFalse(Validation::multiple('hello', [['max', 4]]));
        $this->assertTrue(Validation::multiple('hello', [['unique', ['world', 'foo', 'bar']]]));
        $this->assertFalse(Validation::multiple('world', [['unique', ['world', 'foo', 'bar']]]));

        $this->assertTrue(Validation::multiple('hello', [['min', 5], ['max', 5]]));
        $this->assertTrue(Validation::multiple('hello', [['min', 5], ['max', 15]]));
        $this->assertFalse(Validation::multiple('hello', [['min', 15], ['max', 15]]));
        $this->assertFalse(Validation::multiple('hello', [['min', 15], ['max', 4]]));
        $this->assertTrue(Validation::multiple('hello', [['min', 5], ['unique', ['foo', 'bar']], ['max', 15]]));
        $this->assertFalse(Validation::multiple('hello', [['min', 3], ['unique', ['hi', 'hello', 'hola']], ['max', 14]]));
    }
}
