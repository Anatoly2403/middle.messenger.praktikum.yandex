export function getElementByDataAttr(nodeType, dataAttr, attrValue) {
  return document.querySelector(`${nodeType}[data-${dataAttr}="${attrValue}"]`)
}