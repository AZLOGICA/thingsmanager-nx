const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        navbarPrimary: 'white',
        navbarSecondary: '#075985',
        navbarTextColor:'black',
        sidebarPrimary: 'white',
        sidebarSecondary: '#075985',
        primary: '#075985',
        secondary: '#f0f9ff',
        generalBackgroundColor: 'white',
        generalTextColor: '#27272a',
        gradientPrimary:  '#075985',
        gradientSecondary: '#60a5fa',
        buttonPrimary: '#075985',
        buttonSecondary:  '#60a5fa',
        buttonText: 'white',
        tableBackground: 'white',
        tableText: 'black',
        inputBackground:'white',
        inputText: '#374151',
        inputBorder: '#e5e7eb',
        inputBorderFocus: '#075985'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')]
};
