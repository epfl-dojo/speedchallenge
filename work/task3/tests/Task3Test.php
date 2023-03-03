<?php

namespace Trade17\Tests;

use Trade17\Tests\Helper\BaseTest;

class Task3Test extends BaseTest
{
    /**
     * @medium
     */
    public function testTask3(): void
    {
        $this->assertEquals(
            ['length' => 73, 'words' => 13],
            stringInfo('Spiders are the only web developers in the world that enjoy finding bugs.')
        );

        $this->assertEquals(
            ['length' => 68, 'words' => 12],
            stringInfo('What\'s the difference between a dentist and a web page?
The doctype.')
        );

        $this->assertEquals(
            ['length' => 90, 'words' => 16],
            stringInfo('Debugging is like being the detective in a crime movie...	where you are also the murderer!')
        );
    }
}
