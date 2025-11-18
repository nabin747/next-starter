import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    rules: {
      // Keep warnings as errors during hooks to maintain quality bar.
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },
];

export default config;
