import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALISHA",
};

const bodyStyle = "overflow-y: unset; height: 100dvh;"
  .split(";")
  .map((part) => part.trim())
  .filter(Boolean)
  .reduce<Record<string, string>>((style, declaration) => {
    const separator = declaration.indexOf(":");
    if (separator === -1) return style;
    const property = declaration.slice(0, separator).trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    style[property] = declaration.slice(separator + 1).trim();
    return style;
  }, {});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className="wc-ready" suppressHydrationWarning>
      <body
        className="wp-singular post-template post-template-elementor_canvas single single-post postid-45286 single-format-standard wp-embed-responsive wp-theme-hello-elementor theme-default elementor-default elementor-template-canvas elementor-kit-16606 elementor-page elementor-page-45286 e--ua-blink e--ua-webkit wpdiscuz_7.6.45"
        style={bodyStyle}
        data-elementor-device-mode="desktop"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
