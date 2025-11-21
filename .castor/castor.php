<?php

use Castor\Attribute\AsTask;
use function Castor\context;
use function Castor\run;

#[AsTask]
function start(): void
{
    run(['docker', 'compose', 'up', '--build', '-d', '--remove-orphans']);
}

#[AsTask]
function stop(): void
{
    run(['docker', 'compose', 'down', '--remove-orphans']);
}

#[AsTask]
function install(): void
{
    start();
}

#[AsTask]
function shell(): void
{
    run(['docker', 'compose', 'exec', 'app', 'bash'], context: context()->withTty()->withAllowFailure());
}
