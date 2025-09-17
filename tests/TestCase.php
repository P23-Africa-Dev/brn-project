<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Vite;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Fake Vite during tests so it doesn't look for actual compiled assets
        Vite::useBuildDirectory('fake-build');
    }
}
