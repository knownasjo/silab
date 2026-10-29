module.exports = {
  agentRules: false,
  logging: {
    browserToTerminal: false,
    serverFunctions: false,
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
