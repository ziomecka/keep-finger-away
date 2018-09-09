const isNumber = (num: any) => {
  return (typeof num === 'number' && !isNaN(num));
};

export interface EnumObject {
  [name: string]: number;
};

const enumObject = (enumeration: any): EnumObject => {
  return Object.keys(enumeration)
    .filter((value) => {
      return !isNumber(Number(value));
    })
    .reduce((acc, cv) => {
      // @ts-ignore
      acc[cv] = enumeration[cv];
      return acc;
    }, {});
}

export default enumObject;