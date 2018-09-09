import LevelEnum from './level';
const { level, easy, challenging, hard } = LevelEnum.Level;

export default {
  ['pl_PL']: {
    [String(level)]: 'poziom',
    [String(easy)]: 'łatwy',
    [String(challenging)]: 'wymagający',
    [String(hard)]: 'trudny'
  },
  ['en_EN']: {
    [String(level)]: 'level',
    [String(easy)]: 'easy',
    [String(challenging)]: 'challenging',
    [String(hard)]: 'hard'
  },
  ['en_US']: {
    [String(level)]: 'level',
    [String(easy)]: 'easy',
    [String(challenging)]: 'challenging',
    [String(hard)]: 'hard'
  }
};
