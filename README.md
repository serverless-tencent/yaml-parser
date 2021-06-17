# Serverless Yaml Parser

[![npm](https://img.shields.io/npm/v/@slsplus/yaml-parser)](http://www.npmtrends.com/@slsplus/yaml-parser)
[![NPM downloads](http://img.shields.io/npm/dm/@slsplus/yaml-parser.svg?style=flat-square)](http://www.npmtrends.com/@slsplus/yaml-parser)
[![Build Status](https://github.com/serverless-plus/cli/workflows/Release/badge.svg?branch=master)](https://github.com/serverless-plus/cli/actions?query=workflow:Release+branch:master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Yaml Parser for Serverless Framework.

- [@slsplus/yaml-parser](#Serverless-Yaml-Parser)
  - [Installation](#installation)
  - [Usage](#usage)
    - [parse](#Parse-serverless-config-file)

## Installation

```bash
$ npm i @slsplus/yaml-parser -g
```

## Usage

```bash
Usage: yparse [options]

Parse serverless config file with costomize and environment variables replacement

Options:
  -v, --version                       output the current version
  -i, --input [input]                 source serverless config file path
  -o, --output                        whether output parse result to input serverless config file (default: false)
  -O, --output-path [outputPath]      output parse result to target serverless config file path
  -r, --root [rootDir]                root directory for parse command running
  -a, --auto-create                   whether auto create serverless config file (default: false)
  -c, --component [component]         serverless component name
  -s, --sls-options [slsOptions]      serverless config
  -l, --layer-options [layerOptions]  serverless layer config
  -or, --override [override]          override serverless config (default: false)
  -h, --help                          display help for command

Example call:
  $ yparse --help
```

### Parse serverless config file

```bash
$ yparse -o -s '{"src":"./"}'
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

## License

MIT License

Copyright (c) 2021 Tencent Cloud, Inc.
