module.exports = () => {
  require('regenerator-runtime');
  const chai = require('chai');
  const enzyme = require('enzyme');
  const Adapter = require('enzyme-adapter-react-16');
  const { configure } = enzyme;

  configure({ adapter: new Adapter() });

  global.React = require('react');
  global.expect = chai.expect;
  global.shallow = enzyme.shallow;
}