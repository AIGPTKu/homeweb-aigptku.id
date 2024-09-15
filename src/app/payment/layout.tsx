import type { Metadata } from "next";
import "@/styles/globals.css";
import { GlobalProvider } from "@/context/global";

// const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: any): Promise<Metadata> {
  try {
    return {
      title: "AIGPTku",
      description: "Assisten kerja kamu!",
      icons: "/aigptku.id-logo-min.png",
      openGraph: {
        title: "AIGPTku",
        description: "Assisten kerja kamu!",
        images: "/aigptku.id-logo-min.png",
      },
    };
  } catch (error) {
    return {
      title: "AIGPTku",
      description: "Assisten kerja kamu!",
      icons: "/aigptku.id-logo-min.png",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="SB-Mid-client-aov-ePZ9RG0fN2f2"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
