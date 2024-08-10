/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      'example.com', // 스웨거샘플오류라서 삭제해야함.
    ],
    unoptimized: true,
  },
};

export default nextConfig;
