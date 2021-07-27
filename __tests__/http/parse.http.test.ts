import { join } from 'path';
import { removeSync, outputFileSync } from 'fs-extra';
import { parse } from '../../src/parse';

describe('Parse command test', () => {
  // inject environment variables
  process.env.REGION = 'ap-guangzhou';

  const configFileContent = `org: orgDemo
app: appDemo
stage: dev
component: http
name: httpDemo

inputs:
  src:
    src: ./
    exclude:
      - .env
  region: \${env:REGION}
  faas:
    framework: express
    runtime: Nodejs10.15
  apigw:
    protocols:
      - http
      - https
`;
  const demoPath = join(__dirname, 'demo');
  const outputPath = join(__dirname, 'output');
  const layerPath = join(__dirname, 'layer');
  const fileName = 'serverless.yml';

  beforeAll(() => {
    const configFile = join(demoPath, fileName);
    outputFileSync(configFile, configFileContent);
  });

  afterAll(() => {
    removeSync(demoPath);
    removeSync(outputPath);
    removeSync(layerPath);
  });

  const configFile = join(demoPath, fileName);

  test(`should success parse ${fileName} file`, async () => {
    const res = parse({
      rootDir: __dirname,
      input: configFile,
    });
    expect(res).toEqual({
      org: 'orgDemo',
      app: 'appDemo',
      stage: 'dev',
      component: 'http',
      name: 'httpDemo',
      inputs: {
        src: {
          src: './',
          exclude: ['.env'],
        },
        region: 'ap-guangzhou',
        faas: {
          framework: 'express',
          runtime: 'Nodejs10.15',
        },
        apigw: {
          protocols: ['http', 'https'],
        },
      },
    });
  });

  test(`should success parse ${fileName} file using slsOptions`, async () => {
    const res = parse({
      rootDir: __dirname,
      input: configFile,
      slsOptionsJson: '{"inputs":{"src":"./src"}}',
    });
    expect(res).toEqual({
      org: 'orgDemo',
      app: 'appDemo',
      stage: 'dev',
      component: 'http',
      name: 'httpDemo',
      inputs: {
        src: './src',
        region: 'ap-guangzhou',
        faas: {
          framework: 'express',
          runtime: 'Nodejs10.15',
        },
        apigw: {
          protocols: ['http', 'https'],
        },
      },
    });
  });

  test(`should success parse ${fileName} file using slsOptions with new property`, async () => {
    const res = parse({
      rootDir: __dirname,
      input: configFile,
      slsOptionsJson: '{"inputs":{"src":"./","test":1}}',
    });
    expect(res).toEqual({
      org: 'orgDemo',
      app: 'appDemo',
      stage: 'dev',
      component: 'http',
      name: 'httpDemo',
      inputs: {
        src: './',
        test: 1,
        region: 'ap-guangzhou',
        faas: {
          framework: 'express',
          runtime: 'Nodejs10.15',
        },
        apigw: {
          protocols: ['http', 'https'],
        },
      },
    });
  });

  test(`should success parse ${fileName} file override by slsOptions `, async () => {
    const res = parse({
      rootDir: __dirname,
      input: configFile,
      override: true,
      slsOptionsJson:
        '{"org": "orgDemo","app": "appDemo","stage": "dev","component": "http","name": "httpDemoTest","inputs":{"src":"./","region":"ap-guangzhou"}}',
    });
    expect(res).toEqual({
      org: 'orgDemo',
      app: 'appDemo',
      stage: 'dev',
      component: 'http',
      name: 'httpDemoTest',
      inputs: {
        src: './',
        region: 'ap-guangzhou',
      },
    });
  });

  test(`should success parse ${fileName} file using layerOptions of http component`, async () => {
    const res = parse({
      rootDir: __dirname,
      input: configFile,
      layerOptionsJson:
        '{"org":"orgDemo","app":"appDemo","stage":"dev","runtime":"Nodejs10.15","region":"ap-guangzhou"}',
    });
    expect(res).toEqual({
      org: 'orgDemo',
      app: 'appDemo',
      stage: 'dev',
      component: 'http',
      name: 'httpDemo',
      inputs: {
        region: 'ap-guangzhou',
        src: {
          src: './',
          exclude: ['.env'],
        },
        faas: {
          framework: 'express',
          runtime: 'Nodejs10.15',
          layers: [
            {
              name: '${output:${stage}:${app}:appDemo-layer.name}',
              version: '${output:${stage}:${app}:appDemo-layer.version}',
            },
          ],
        },
        apigw: {
          protocols: ['http', 'https'],
        },
      },
    });
  });
});
