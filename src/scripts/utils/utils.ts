export function getNodeByDataAttr(
  nodeType: string,
  attrValue: string
): HTMLElement | null {
  const attributeValue = attrValue ? `="${attrValue}"` : "";
  return document.querySelector(`${nodeType}[data-id${attributeValue}]`);
}

export function getNode(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

export function getNodeAll(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector);
}
