import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finsensor Limited - Advanced Financial Reporting Software",
  description:
    "FinSoEasy360 - Advanced financial reporting software for automated balance sheets and profit & loss statements. Transform your financial reporting with AI-powered automation.",
  keywords: [
    "financial reporting software",
    "balance sheet automation",
    "profit loss statements",
    "financial consolidation",
    "accounting software",
    "financial analysis",
    "FinSoEasy360",
    "Finsensor",
    "financial reporting automation",
    "cloud-based accounting",
  ],
  authors: [{ name: "Finsensor Limited" }],
  creator: "Finsensor Limited",
  publisher: "Finsensor Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://finsensor.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://finsensor.ai",
    siteName: "Finsensor Limited",
    title: "Finsensor Limited - Advanced Financial Reporting Software",
    description:
      "FinSoEasy360 - Advanced financial reporting software for automated balance sheets and profit & loss statements. Transform your financial reporting with AI-powered automation.",
    images: [
      {
        url: "/finso360.png",
        width: 1200,
        height: 630,
        alt: "Finsensor Limited - Financial Reporting Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finsensor Limited - Advanced Financial Reporting Software",
    description:
      "FinSoEasy360 - Advanced financial reporting software for automated balance sheets and profit & loss statements.",
    images: ["/finso360.png"],
    creator: "@finsensor",
    site: "@finsensor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  classification: "financial software",
  other: {
    "msapplication-config": "/favicon/browserconfig.xml",
    "application-name": "Finsensor Limited",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Finsensor",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#512F8D",
    "msapplication-tap-highlight": "no",
    "theme-color": "#512F8D",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-icon.png", sizes: "180x180", type: "image/png" },
      {
        url: "/favicon/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
    ],
    other: [
      {
        url: "/favicon/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        url: "/favicon/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/favicon/android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/favicon/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/favicon/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/favicon/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      { url: "/favicon/ms-icon-70x70.png", sizes: "70x70", type: "image/png" },
      {
        url: "/favicon/ms-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/favicon/ms-icon-150x150.png",
        sizes: "150x150",
        type: "image/png",
      },
      {
        url: "/favicon/ms-icon-310x310.png",
        sizes: "310x310",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#512F8D" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Finsensor" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#512F8D" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
