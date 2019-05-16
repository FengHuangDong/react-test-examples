import visibilityFilter from '../../../src/reducers/FilterReducer'
import * as actionTypes from '../../../src/actions/actionsTypes'

describe('visibilityFilter reducer', () => {
  it('should return the initial state', () => {
    expect(
      visibilityFilter(undefined,{})
    ).toEqual(actionTypes.SHOW_ALL)
  });
  it('should handle SET_VISIBILITY_FILTER', () => {
    expect(
      visibilityFilter(actionTypes.SHOW_ALL,{
        type:actionTypes.SET_VISIBILITY_FILTER,
        payload:actionTypes.SHOW_ACTIVE
      })
    ).toEqual(actionTypes.SHOW_ACTIVE)
  });
});