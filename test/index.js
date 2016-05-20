import 'babel-polyfill';
import connectMap from '../src';
import { connect } from 'react-redux';
import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
chai.should();

describe('connectMap', () => {
  it('should connect appropriately', () => {
    const connectSpy = chai.spy(connect);
    connectMap({ 'foo': 'bar' });
    connectSpy.should.have.been.called();
  });
});
