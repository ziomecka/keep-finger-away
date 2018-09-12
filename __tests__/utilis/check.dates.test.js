import common from '../common';
common();
import { default as timeFunctions } from '../../src/utilis/check.dates';
const isSameDay = timeFunctions.isSameDay;

describe('isSameDay function ', () => {
  it('returns false if dates from different dates are compared', () => {
    let date1 = new Date(Date.now());
    let date2 = new Date(
      `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate() - 1}`
    );

    // console.log(date1);
    // console.log(date2);
    let result = isSameDay(date1, date2, true, true);
    expect(result).to.be.false;
  });
});
