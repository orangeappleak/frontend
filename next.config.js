/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.icons8.com', 'images.unsplash.com']
  },
  reactStrictMode: false,
  env: {
    BACKEND_API_URL: 'http://localhost:8080/api/experts'
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*'
      }
    ]
  }
}

module.exports = nextConfig