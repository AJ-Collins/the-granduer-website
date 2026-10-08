import type { NextConfig } from 'next'
import path from 'path'

const config: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '../../'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
}

export default config
