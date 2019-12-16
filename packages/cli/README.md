@gqli/cli
=========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@gqli/cli.svg)](https://npmjs.org/package/@gqli/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@gqli/cli.svg)](https://npmjs.org/package/@gqli/cli)
[![License](https://img.shields.io/npm/l/@gqli/cli.svg)](https://github.com/Landuck/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @gqli/cli
$ gqli COMMAND
running command...
$ gqli (-v|--version|version)
@gqli/cli/	1.0.0 win32-x64 node-v12.13.1
$ gqli --help [COMMAND]
USAGE
  $ gqli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gqli hello [FILE]`](#gqli-hello-file)
* [`gqli help [COMMAND]`](#gqli-help-command)

## `gqli hello [FILE]`

describe the command here

```
USAGE
  $ gqli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ gqli hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/Landuck/cli/blob/v	1.0.0/src\commands\hello.ts)_

## `gqli help [COMMAND]`

display help for gqli

```
USAGE
  $ gqli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src\commands\help.ts)_
<!-- commandsstop -->
