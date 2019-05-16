import mockAxios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../src/actions/todo'
import * as actionTypes from '../../../src/actions/actionsTypes'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('todo actions', () => {
  it('should dispatch addToList action', () => {
    const mockPayload = "test"
    const expectedAction = {
      type:actionTypes.ADD_TODO,
      payload:mockPayload
    }
    expect(actions.addToList(mockPayload)).toEqual(expectedAction);
  });
  it('should dispatch setVisibilityFilter action', () => {
    const mockPayload = "test"
    const expectedAction = {
      type:actionTypes.SET_VISIBILITY_FILTER,
      payload:mockPayload
    }
    expect(actions.setVisibilityFilter(mockPayload)).toEqual(expectedAction);
  });
  it('should dispatch toogleTodo action', () => {
    const mockPayload = "test"
    const expectedAction = {
      type:actionTypes.TOGGLE_TODO,
      payload:mockPayload
    }
    expect(actions.toogleTodo(mockPayload)).toEqual(expectedAction);
  });
  it('should dispatch removeFromList action', () => {
    const mockPayload = "test"
    const expectedAction = {
      type:actionTypes.REMOVE_TODO,
      payload:mockPayload
    }
    expect(actions.removeFromList(mockPayload)).toEqual(expectedAction);
  });
  it('should dispatch fetchTodos action', async () => {
    const store = mockStore()
    const mockResp = {data:[]}
    mockAxios.get.mockResolvedValue(mockResp);
    const expectedActions = [{
      type:actionTypes.FETCH_TODOS,
      payload:mockResp
    }]
    await store.dispatch(actions.fetchTodos())
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should dispatch error fetchTodos action',async () => {
    const store = mockStore()
    const mockResp = {message:'Network Error'}
    mockAxios.get.mockRejectedValue(mockResp);
    const expectedActions = [{
      type:actionTypes.ERR_FETCH_TODOS,
      payload:mockResp
    }]
    await store.dispatch(actions.fetchTodos())
    expect(store.getActions()).toEqual(expectedActions);
  })
});