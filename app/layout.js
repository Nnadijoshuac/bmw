import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "BMW M4 GT3",
  description: "BMW M4 GT3 landing page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}