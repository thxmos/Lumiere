/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com", // google auth
      },
      {
        hostname: "3sygz88yjtarhtwa.public.blob.vercel-storage.com", // blob storage
      },
      {
        hostname: "wel3maxfznh6pda2.public.blob.vercel-storage.com", // blob storage why is this different? used for placeholder images
      },
      {
        hostname: "api.qrserver.com", // qr code generator
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", //TODO: whats a good amount here idk
    },
  },
};

export default nextConfig;
