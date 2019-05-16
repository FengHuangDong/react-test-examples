import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {App,mapDispatchToProps} from "../../src/App"
import {shallow} from 'enzyme'
import toJson from "enzyme-to-json"
import * as actionTypes from '../../src/actions/actionsTypes'

describe('mapDispatchToProps', () => {
  it('should action to be call when dispatch',async () => {
    const configMockStore = configureMockStore([thunkMiddleware]);
    const mockStore = configMockStore({});
    const dispatchMappedProps = mapDispatchToProps(mockStore.dispatch)
    await dispatchMappedProps.fetchTodos()
    expect(mockStore.getActions().map(action => action.type)).toEqual([actionTypes.FETCH_TODOS])
  })
});

describe('App Components', () => {
  let mockProps
  beforeEach(() => {
    mockProps = {
      fetchTodos:jest.fn(),
      addToList:jest.fn()
    }
  })
  it('should render the component', () => {
    const wrapper = shallow(<App {...mockProps}/>)
    expect(mockProps.fetchTodos).toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  })
  it("should call addToList handle",() => {
    const wrapper = shallow(<App {...mockProps}/>)
    const instance = wrapper.instance()
    const mockArgs ={title:"test"}
    instance.mySubmit(mockArgs)
    expect(mockProps.addToList).toHaveBeenCalled();
  })
})
