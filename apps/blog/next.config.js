module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    transpilePackages: ["ui"],
    modularizeImports: {
      '@mui/material': {
        transform: '@mui/material/{{member}}',
      },
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
    },
    appDir: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'piaapkoirennmamfzhzp.supabase.co',
      },
    ],
  },
};
