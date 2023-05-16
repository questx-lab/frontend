/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
        },
      }
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    }
    return config
  },
  output: 'standalone',
}

module.exports = nextConfig
