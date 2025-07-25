import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';
import './src/libs/Env';

// Define the base Next.js configuration
const baseConfig: NextConfig = {
  eslint: {
    dirs: ['.'],
    // Ignore ESLint errors during production builds so the build will not fail
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

// Initialize the Next‑Intl plugin
let configWithPlugins = createNextIntlPlugin('./src/libs/I18n.ts')(baseConfig);

// Conditionally enable bundle analysis
if (process.env.ANALYZE === 'true') {
  configWithPlugins = withBundleAnalyzer()(configWithPlugins);
}

// Conditionally enable Sentry configuration
if (!process.env.NEXT_PUBLIC_SENTRY_DISABLED) {
  configWithPlugins = withSentryConfig(configWithPlugins, {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options
    org: process.env.SENTRY_ORGANIZATION,
    project: process.env.SENTRY_PROJECT,

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,
  });
}


/*
 * The following constants were part of Sentry's advanced configuration, which can
 * include options such as widening client file upload, enabling React component
 * annotations, configuring a tunnel route, disabling logger statements, and
 * disabling telemetry. These declarations were unused in this configuration and
 * triggered TypeScript errors (unused variables). If you need to enable these
 * features in the future, integrate them within the Sentry plugin configuration
 * instead of declaring standalone variables here.
 */

const nextConfig = configWithPlugins;
export default nextConfig;
