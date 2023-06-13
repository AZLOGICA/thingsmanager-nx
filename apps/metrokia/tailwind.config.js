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
        navbarPrimary: '#FFFFFF',
        navbarSecondary: '#075985',
        navbarTextColor:'#FFFFFF',
        sidebarPrimary: 'white',
        sidebarSecondary: '#075985',
        primary: '#075985',
        secondary: '#f0f9ff',
        generalBackgroundColor: '#FFFFFF',
        generalTextColor: '#27272a',
        gradientPrimary:  '#075985',
        gradientSecondary: '#60a5fa',
        buttonPrimary: '#075985',
        buttonSecondary:  '#60a5fa',
        buttonText: '#FFFFFF',
        tableBackground: '#FFFFFF',
        tableText: 'black',
        inputBackground:'#FFFFFF',
        inputText: '#374151',
        inputBorder: '#e5e7eb',
        inputBorderFocus: '#075985'
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
          primary: "#075985",
                  
          secondary: "#f0f9ff",
          "base-100": "#f8fafc",
          accent: "white",
                  
          neutral: "white",

        },
      },
    ],
  },
  plugins: [require('@tailwindcss/forms'),  require("daisyui")]
};
