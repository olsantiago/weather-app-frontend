function findUnique(value: string, index: number, list: string[]): boolean {
  return list.indexOf(value) === index;
}

export function makeUnique(list: string[]): string[] {
  return list.filter(findUnique);
}
