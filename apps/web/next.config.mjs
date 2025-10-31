/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude ws from webpack bundling on the server (it's a Node.js native module)
      config.externals.push('ws', 'bufferutil', 'utf-8-validate');
    }
    return config;
  },
};

export default nextConfig;
