const isNumber = (num: any) => {
  return (typeof num === 'number' && !isNaN(num));
};

const enumArray = (enumeration: any, language?: any): any[] => {
  return Object.keys(enumeration)
    .filter((value) => {
      return !isNumber(Number(value));
    })
    .map(value => {
      // @ts-ignore
      if (language) {
        return [String(language[enumeration[value]]), String(enumeration[value])];
      } else {
        return [String(enumeration[value]), enumeration[value]];
      }
    });
};

export default enumArray;