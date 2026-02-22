export default defineEventHandler(async () => {
  // Mock API response - ในอนาคตจะดึงจาก package.json จริง
  const dependencies = [
    {
      name: 'nuxt',
      description: 'The Intuitive Vue Framework',
      current: '3.8.0',
      latest: '3.9.0',
      status: 'outdated',
      type: 'dependencies',
      license: 'MIT',
      homepage: 'https://nuxt.com',
      repository: 'https://github.com/nuxt/nuxt'
    },
    {
      name: 'vue',
      description: 'The progressive JavaScript framework',
      current: '3.3.8',
      latest: '3.3.8',
      status: 'current',
      type: 'dependencies',
      license: 'MIT',
      homepage: 'https://vuejs.org',
      repository: 'https://github.com/vuejs/core'
    },
    {
      name: '@unocss/nuxt',
      description: 'The instant on-demand atomic CSS engine',
      current: '0.58.0',
      latest: '0.58.0',
      status: 'current',
      type: 'devDependencies',
      license: 'MIT',
      homepage: 'https://unocss.dev',
      repository: 'https://github.com/unocss/unocss'
    },
    {
      name: 'lodash',
      description: 'Lodash modular utilities',
      current: '4.17.20',
      latest: '4.17.21',
      status: 'vulnerable',
      type: 'dependencies',
      license: 'MIT',
      homepage: 'https://lodash.com',
      repository: 'https://github.com/lodash/lodash'
    },
    {
      name: 'typescript',
      description: 'TypeScript is a language for application-scale JavaScript',
      current: '5.9.3',
      latest: '5.9.4',
      status: 'outdated',
      type: 'devDependencies',
      license: 'Apache-2.0',
      homepage: 'https://typescriptlang.org',
      repository: 'https://github.com/microsoft/TypeScript'
    }
  ];

  const stats = {
    total: dependencies.length,
    outdated: dependencies.filter((d) => d.status === 'outdated').length,
    vulnerable: dependencies.filter((d) => d.status === 'vulnerable').length,
    dev: dependencies.filter((d) => d.type === 'devDependencies').length
  };

  return {
    dependencies,
    stats
  };
});
