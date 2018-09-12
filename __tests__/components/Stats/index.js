import common from '../../common';
common();
import Stats from '../../../src/components/Stats/';

const dataSet = 'set1';

jest.mock('react-native', () => ({
  AsyncStorage: require('../../mocks/AsyncStorage/').default
}));

  describe('Statistics component ', () => {
    let wrapper;
    let wrap;
    let instance;
    let AsyncStorage;

    beforeEach(() => {
      wrapper = () => shallow(<Stats />);
      wrap = wrapper();
      instance = wrap.instance();
    });

  afterEach(() => {
    wrapper = null;
    wrap = null;
    instance = null;
    AsyncStorage = null;
  });

  it('returns today property of type number', () => {
    let result = typeof instance.today === 'number';
    expect(result).to.be.true;
  });

  it('returns today property that is almost equal to Date.now()', () => {
    let result = instance.today - Date.now() <= 1;
    expect(result).to.be.true;
  });

  it('returns true if two same dates compared', () => {
    let date1 = new Date(Date.now());
    let date2 = new Date(Date.now());

    let result = instance.isSameDay(date1, date2, true, true);
    expect(result).to.be.true;
  });

  it('returns false if dates from different dates are compared', () => {
    let date1 = new Date(Date.now());
    let date2 = new Date(`${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate() - 1}`);
    // console.log(date1);
    // console.log(date2);
    let result = instance.isSameDay(date1, date2, true, true);
    expect(result).to.be.false;
  });

  it('has four states when mounted: stats, data, rawData, isDataLoaded that equal the loaded data',
    (done) => {
      const set = require('../../mocks/AsyncStorage/data').default[dataSet];

      setTimeout(() => {
        expect(JSON.stringify(instance.state['stats'])).to.equal(set.stats);
        expect(JSON.stringify(instance.state['data'])).to.equal(set.data);
        expect(JSON.stringify(instance.state['rawData'])).to.equal(set.rawData);
        expect(instance.state['isDataLoaded']).to.be.true;
        done();
      }, 2000);
    }
  );
});