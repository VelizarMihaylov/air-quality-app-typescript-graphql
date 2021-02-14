module.exports = {
  stories: ['../src/components/**/*.stories.tsx', './design-system/**/*.stories.(jsx|mdx)'],
  addons: ['@storybook/preset-create-react-app', '@storybook/addon-docs', '@storybook/addon-controls', '@storybook/addon-viewport'],
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript'
  },
};
