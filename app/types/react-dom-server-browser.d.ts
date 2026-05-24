declare module "react-dom/server.browser" {
  import type { ReactNode } from "react";

  export function renderToStaticMarkup(reactNode: ReactNode): string;
}
