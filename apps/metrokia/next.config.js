//@ts-check
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require("@nrwl/next/plugins/with-nx");

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  output: 'standalone',
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  outputFileTracingRoot: path.join(__dirname, '../../'),
 // outputFileTracingRoot: path.join(__dirname, "../../"),
  reactStrictMode: false,

};

module.exports = withNx(nextConfig);
