function getEnumKeys<E extends object, K extends keyof E = keyof E>(
  enumeration: E
): K[] {
  return Object.keys(enumeration).filter((k) => Number.isNaN(+k)) as K[];
}

export default getEnumKeys;
