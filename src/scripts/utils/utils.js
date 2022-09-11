export function getElementByDataAttr(nodeType, dataAttr, attrValue) {
  const attributeValue = attrValue ? `="${attrValue}"` : '';
  return document.querySelector(`${nodeType}[data-${dataAttr}${attributeValue}]`)
}