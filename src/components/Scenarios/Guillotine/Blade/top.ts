import LevelEnum from '../../../../enumerations/level';

const { easy, challenging, hard } = LevelEnum.Level;

export default {
  [easy.toString()]: 0,
  [challenging.toString()]: 50,
  [hard.toString()]: 100
};