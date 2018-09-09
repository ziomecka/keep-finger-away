const isObject = (obj: any): boolean => {
  let isArray = Array.isArray(obj);
  let isBasic = (() => typeof obj !== 'object')();
  return !isBasic && !isArray;
};

const destructure = (options: any = {}, defs: any = {}): any => {
  Object.keys(defs).forEach(property => {
    // @ts-ignore 
    if (options[property] === undefined) {
      // @ts-ignore 
      options[property] = defs[property];
    } else {
      // @ts-ignore 
      if (isObject(options[property])) {
        // @ts-ignore 
        destructure(options[property], defs[property]);
      }
    }
  });

  return options;
};

export const destructureStyles =
  function (style: any, defaultStyle: any): any {
    if (style) {
      return destructure(style, defaultStyle);
    } else {
      return defaultStyle;
    }  
  }

export default destructure;