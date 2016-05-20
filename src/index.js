import { connect } from 'react-redux';
import extend from 'lodash/extend';
import mapValues from 'lodash/mapValues';

/**
 * a utility function for connect
 *
 * @param  {object} map - a map of props for a component to locations
 *                        on the store. Can use dot notation.
 * @param  {function} reduxConnect - should always equal connect. is a
 *                                   parameter strictly for testing
 *                                   purposes & should never be set
 *
 * @return {function} - the connection function for this map (to apply
 *                      to the component)
 */
export default function connectMap(map, reduxConnect = connect) {
  return reduxConnect((state, ownProps) => {
    const connectedProps = mapValues(map, (value, key) => {
      const keys = value.split('.');
      while (key = keys.shift()) { // eslint-disable-line no-cond-assign
        if (!state) { break; } // eslint-disable-line brace-style
        state = state[key];
      }
      return state;
    });
    return extend(ownProps, connectedProps);
  });
}
