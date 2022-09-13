export function getNodeByDataAttr(nodeType, attrValue) {
  const attributeValue = attrValue ? `="${attrValue}"` : '';
  return document.querySelector(`${nodeType}[data-id${attributeValue}]`)
}

export function getNode(selector) {
  return document.querySelector(selector)
}

export function getNodeAll(selector) {
  return document.querySelectorAll(selector)
}