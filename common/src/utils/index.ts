export const enumValues = (e: any): string[] =>
  Object.keys(e)
    .map((key) => e[key])
    .filter((k) => !(parseInt(k) >= 0));
