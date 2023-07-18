/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/homepage/:path*",
        headers: [
          {
            key: "sessionId",
            value: ":slug",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
