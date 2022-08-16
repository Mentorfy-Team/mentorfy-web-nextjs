/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  webpack: (config, {isServer}) => {
    if (isServer) {
      config.resolve.mainFields = [ 'module', 'main' ];
    }
    return config;
  },
};
