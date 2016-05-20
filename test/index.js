import 'babel-polyfill';
import connectMap from '../src';
import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
chai.should();

function getSpyCall(spy, i = 0) {
  return spy.__spy.calls[i]; // eslint-disable-line no-underscore-dangle
}

describe('connectMap', () => {
  let connectSpy = null;
  beforeEach(() => {
    connectSpy = chai.spy('connect');
  });
  it('should connect appropriately', () => {
    connectMap({ 'foo': 'bar' }, connectSpy);
    connectSpy.should.have.been.called(1);
    const callArgs = getSpyCall(connectSpy);
    callArgs[0].should.be.a('function');
  });

  describe('callback checking', () => {
    it('should provide a working callback', () => {
      connectMap({ 'foo': 'bar' }, connectSpy);
      const mapStateToProps = getSpyCall(connectSpy)[0];
      mapStateToProps({ 'bar': 1 }).should.eql({ 'foo': 1 });
    });

    it('should be able to fetch nested properties', () => {
      connectMap({ 'foo': 'bar.baz' }, connectSpy);
      const mapStateToProps = getSpyCall(connectSpy)[0];
      mapStateToProps({ 'bar': { 'baz': 10 } }).should.eql({ 'foo': 10 });
    });
  });
});
