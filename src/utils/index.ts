export * from './validators';

export async function parseImg(file: File): Promise<string> {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => res(target?.result as string);
    reader.readAsDataURL(file);
  });
}
