module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iocfyvgigcycchqvjnik.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/images-dev/**",
      },
    ],
  },
};
