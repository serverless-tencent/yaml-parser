import { AnyObject } from '../typings';

interface ComponentConfig {
  org: string;
  app: string;
  stage: string;
  component: string;
  name: string;
  inputs: AnyObject;
}

// use scf component for default
function getDefaultConfig(component = 'scf'): ComponentConfig {
  return {
    org: 'orgDemo',
    app: 'appDemo',
    stage: 'dev',
    component: component,
    name: `${component}Demo`,
    inputs: {
      src: './',
    },
  };
}

const BASE_COMPONENTS = ['scf'];

const FRAMEWORK_COMPONENTS = [
  'express',
  'koa',
  'egg',
  'nextjs',
  'nuxtjs',
  'nestjs',
  'flask',
  'django',
  'laravel',
  'thinkphp',
];

const HTTP_FRAMEWORKS = [
  'express',
  'koa',
  'egg',
  'nextjs',
  'nuxtjs',
  'nest',
  'flask',
  'django',
  'laravel',
];

const COMPONENTS = [...BASE_COMPONENTS, ...FRAMEWORK_COMPONENTS];

const isBaseComponent = (name: string) => {
  return BASE_COMPONENTS.indexOf(name) !== -1;
};

const isFrameworkComponent = (name = 'framework') => {
  return FRAMEWORK_COMPONENTS.indexOf(name) !== -1;
};

const isHttpFramework = (component: string, framework?: string) => {
  return component === 'http' && framework && HTTP_FRAMEWORKS.includes(framework);
};

export { COMPONENTS, getDefaultConfig, isBaseComponent, isFrameworkComponent, isHttpFramework };
