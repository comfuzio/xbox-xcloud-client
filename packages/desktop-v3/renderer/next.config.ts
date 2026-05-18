import { NextConfig } from 'next'

const isWebBuild = process.env.BUILD_TARGET === 'web'

const config: NextConfig = {
  output: 'export',
  distDir: isWebBuild ? '../web-out' : process.env.NODE_ENV === 'production' ? '../app' : '.next',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default config
