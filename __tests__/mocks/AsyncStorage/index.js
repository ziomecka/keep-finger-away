let data = require('./data').default;

/** Stringified data */
let storageCache = (() => {
  let dataSet = data.set1;
  Object.keys(dataSet).forEach(key => {
    dataSet[key] = JSON.stringify(dataSet[key]);
  })
  return dataSet;
})();

const isObject = (storage) => Object(storage) === storage;

const getInitialData = (key) => {
  if (isObject(data)) {
    storageCache = file[data];
    if (storageCache === undefined) {
      throw new Error('Data not found');
    }
  } else {
    throw new Error('No data in file');
  }
}

const setItem = jest.fn((key, value) => {
  if (isObject(storageCache) && key !== undefined) {
    storageCache[key] = (typeof value === 'string')
      ? value
      : JSON.stringify(value);
    return Promise.resolve(storageCache[key]);
  } else {
    throw new Error('Cannot setItem on non object');
  }
});

const getItem = jest.fn((key) => {
  if (isObject(storageCache)) {
    if (key !== undefined) {
      // console.log('storageCache[key]: ' + JSON.stringify(key) + ': ' + JSON.stringify(storageCache[key]));
      return Promise.resolve(storageCache[key]);
    } else {
      throw new Error('Key is undefined.');
    }
  } else {
    throw new Error('Cannot getItem from non object.');
  }
});

const multiGet = jest.fn((arr) => {
  if (Array.isArray(arr)) {
    let result = [];
    for (let key of arr) {
      result.push([key]);
      let len = result.length - 1; 
      (() => {
        let j = len;
        getItem(key).then(res => {
          result[j].push(res);
        });
      })();
    }
    return Promise.resolve(result);
  } else {
    throw new Error('Argument is not an array.');
  }
});

const clearStorage = () => {
  storageCache = {};
};

export default {
  setItem,
  getItem,
  multiGet
};
