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

#[AsTask(aliases: ['console'])]
function shell(string $cmd): void
{
    $cmds = ['docker', 'compose', 'exec', 'app', 'bash'];

    if ($cmd !== '') {
        $cmds[] = '-c';
        $cmds[] = $cmd;
    }

    run($cmds, context: context()->withTty()->withAllowFailure());
}

#[AsTask]
function console(string $cmd): void
{
    $cmds = ['docker', 'compose', 'exec', 'app', 'php', 'bin/console'];

    if ($cmd !== '') {
        $cmds[] = $cmd;
    }

    run($cmds, context: context()->withTty()->withAllowFailure());
}
