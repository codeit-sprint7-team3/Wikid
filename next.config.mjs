// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            // 추가적인 옵션을 여기에 설정할 수 있습니다.
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
