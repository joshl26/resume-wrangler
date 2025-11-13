// jest.config.ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js|jsx)",
    "**/?(*.)+(spec|test).+(ts|tsx|js|jsx)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    // Static assets (images/fonts/etc.) — must come BEFORE the path alias mapping so it matches imports like "@/public/..."
    "^@/public/(.*)\\.(png|jpe?g|gif|svg|webp|avif)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp|avif)$": "<rootDir>/__mocks__/fileMock.js",

    // CSS modules/styling -> identity-obj-proxy so className lookups work
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",

    // Path alias: '@/...' -> <rootDir>/...
    "^@/(.*)$": "<rootDir>/$1",
  },
    // optional: allow imports without relative paths (node resolution)
  moduleDirectories: ["node_modules", "<rootDir>"],

  collectCoverage: true,
  collectCoverageFrom: [
    "auth.ts",
    "auth.config.ts",
    "app/**/*.{ts,tsx,js,jsx}",
    "lib/**/*.{ts,tsx,js,jsx}",
    "types/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!app/**/page.tsx",
    "!app/**/layout.tsx",
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  verbose: true,
};

export default config;
