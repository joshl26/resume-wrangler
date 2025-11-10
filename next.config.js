/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable Turbopack (faster alternative to Webpack)
  // Remove this if you want to stick with Webpack
  experimental: {
    externalResolver: true,
  },

  // Turbopack-specific settings
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // Experimental features
  experimental: {
    reactCompiler: true, // Enables automatic memoization
    optimizePackageImports: [
      "@heroicons/react",
      "@fortawesome/react-fontawesome",
      "lucide-react",
    ],
  },

  // Image Optimization Settings
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Webpack fallbacks (only applies if not using Turbopack)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Only apply SVG loader if not using Turbopack
    if (!process.env.TURBOPACK) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
    }

    return config;
  },

  // Performance & Headers
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  async redirects() {
    return [
      // Your custom redirects go here
    ];
  },
};

module.exports = nextConfig;
