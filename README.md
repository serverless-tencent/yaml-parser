# Serverless Yaml Parser

[![npm](https://img.shields.io/npm/v/@serverless-tencent/yaml-parser)](http://www.npmtrends.com/@serverless-tencent/yaml-parser)
[![NPM downloads](http://img.shields.io/npm/dm/@serverless-tencent/yaml-parser.svg?style=flat-square)](http://www.npmtrends.com/@serverless-tencent/yaml-parser)
[![Build Status](https://github.com/serverless-plus/cli/workflows/Release/badge.svg?branch=master)](https://github.com/serverless-plus/cli/actions?query=workflow:Release+branch:master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Yaml Parser for Serverless Framework.

- [@serverless-tencent/yaml-parser](#Serverless-Yaml-Parser)
  - [Installation](#installation)
  - [Usage](#usage)
    - [parse](#Parse-serverless-config-file)

## Installation

```bash
$ npm i @serverless-tencent/yaml-parser -g
```

## Usage

```bash
$ yparse -h
Usage: yparse [options] [command]

Options:
  -v, --version                 output the current version
  -h, --help                    display help for command

Commands:
  parse [options]               parse serverless config file with costomize and environment variables replacement
  help [command]                display help for command

Example call:
  $ yparse --help
```

> Notice: Below examples will use `sp` instead of `yparse`.

### Parse serverless config file

```bash
$ sp parse -o -s '{"src":"./"}'
```

Parse command will parse serverless config file with costomize and environment variables replacement.

For example, before is:

```yaml
inputs:
  region: ${env:REGION}
```

If `process.env.REGION=ap-guangzhou`, after parsing, the `serverless.yml` will be:

```yaml
inputs:
  src: ./
  region: ap-guangzhou
```

### Migrate serverless config file

```bash
$ yparse migrate
```

This command will auto migrate your old yaml config to latest version.

## Development

All `git commit` mesage must follow below syntax:

```bash
type(scope?): subject  #scope is optional
```

support type：

- **feat**: add new feature
- **fix**: fix bug or patch feature
- **ci**: CI
- **chore**: modify config, nothing to do with production code
- **docs**: create or modifiy documents
- **refactor**: refactor project
- **revert**: revert
- **test**: test

Most of time, we just use `feat` and `fix`.

## Test

For CI test, should copy `.env.example` to `.env.test`, then config below environment variables to yours:

```dotenv
# tencent credentials
TENCENT_SECRET_ID=xxx
TENCENT_SECRET_KEY=xxx

# cos url for project code download in CI environment
CODE_URL_COS=xxx
# git ulr for git project
CODE_URL_GIT=xxx

# nextjs
CODE_URL_COS_NEXTJS=xxx
STATIC_URL_NEXTJS=xxx

# nuxtjs
CODE_URL_COS_NUXTJS=xxx
STATIC_URL_NUXTJS=xxx
```

## License

MIT License

Copyright (c) 2020 Serverless Plus
