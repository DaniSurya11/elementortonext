import { Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

const voidTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

type ElementProps = Record<string, unknown> & { children?: ReactNode };

function escapeText(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value: string) {
  return escapeText(value).replace(/\"/g, "&quot;");
}

function htmlAttributeName(name: string) {
  if (name === "className") return "class";
  if (name === "htmlFor") return "for";
  return name;
}

function renderAttributes(props: ElementProps) {
  let html = "";

  for (const [name, value] of Object.entries(props)) {
    if (name === "children" || name === "key" || name === "ref") continue;
    if (value === null || value === undefined || value === false) continue;

    const attrName = htmlAttributeName(name);
    if (value === true) {
      html += " " + attrName + "=\"\"";
      continue;
    }

    html += " " + attrName + "=\"" + escapeAttribute(String(value)) + "\"";
  }

  return html;
}

export function renderJsxToHtml(node: ReactNode, parentTag?: string): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") {
    const text = String(node);
    return parentTag === "script" || parentTag === "style" ? text : escapeText(text);
  }
  if (Array.isArray(node)) return node.map((child) => renderJsxToHtml(child, parentTag)).join("");
  if (!isValidElement(node)) return "";

  const element = node as ReactElement<ElementProps>;
  const props = element.props || {};

  if (element.type === Fragment) return renderJsxToHtml(props.children, parentTag);

  if (typeof element.type === "function") {
    const Component = element.type as (props: ElementProps) => ReactNode;
    return renderJsxToHtml(Component(props), parentTag);
  }

  if (typeof element.type !== "string") return "";

  const tag = element.type;
  const attrs = renderAttributes(props);
  if (voidTags.has(tag)) return "<" + tag + attrs + ">";

  return "<" + tag + attrs + ">" + renderJsxToHtml(props.children, tag) + "</" + tag + ">";
}
