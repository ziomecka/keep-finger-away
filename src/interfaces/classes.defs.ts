import LevelEnum from '../enumerations/level';

export interface Class {
  name: string
};

export default interface ClassesDefs {
  [element: string]: {
    // @ts-ignore
    [level: LevelEnum.Level]: Class
  }
};
