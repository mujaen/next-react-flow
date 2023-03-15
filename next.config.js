/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/about',
        destination: 'https://211.206.251.66:7000'
      }
    ]
  }
}

module.exports = nextConfig
