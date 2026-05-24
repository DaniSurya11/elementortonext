import { renderToStaticMarkup } from "react-dom/server.browser";
import { PagePrelude } from "./components/alisha/page-prelude";
import { ElementorMainStart } from "./components/alisha/elementor-main-start";
import { CoverFixedSection } from "./components/alisha/cover-fixed-section";
import { CoverSpacerSection } from "./components/alisha/cover-spacer-section";
import { InvitationColumnSection } from "./components/alisha/invitation-column-section";
import { PageEnhancements } from "./components/alisha/page-enhancements";
import { renderJsxToHtml } from "./components/alisha/render-jsx-to-html";

const pageHtml = [
  renderJsxToHtml(<PagePrelude />),
  ElementorMainStart(),
  renderToStaticMarkup(<CoverFixedSection />),
  `${renderToStaticMarkup(<CoverSpacerSection />)}\n\t\t`,
  InvitationColumnSection(),
  renderJsxToHtml(<PageEnhancements />),
].join("");

export default function Page() {
  return (
    <div
      id="gc-phase1-page"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  );
}
