export function getNodeByDataAttr(nodeType, dataAttr, attrValue) {
  const attributeValue = attrValue ? `="${attrValue}"` : '';
  return document.querySelector(`${nodeType}[data-${dataAttr}${attributeValue}]`)
}

export function getNode(selector) {
  return document.querySelector(selector)
}

export function getNodeAll(selector) {
  return document.querySelectorAll(selector)
}