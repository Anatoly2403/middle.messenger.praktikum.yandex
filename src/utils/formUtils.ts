export function prepareProps(fields: NodeListOf<HTMLInputElement>) {
  return Array.from(fields).reduce<Record<string, string | File>>((acc, item) => {
    if (item.type === 'file' && item.files) {
      acc[item.name] = item.files[0];
    } else {
      acc[item.name] = item.value;
    }
    return acc;
  }, {});
}
