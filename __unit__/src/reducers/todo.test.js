import todos from '../../../src/reducers/todo'
import * as actionTypes from '../../../src/actions/actionsTypes'
import todo from '../../../src/reducers/todo';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(todos(undefined,{})).toEqual([])
  });
  it('should handle ADD_TODO', () => {
    expect(
      todos([],{
        type:actionTypes.ADD_TODO,
        payload:'test'
      })
    ).toEqual([{id:0,title:'test',completed:false}])

    expect(
      todos([{id:0,title:'test',completed:false}],{
        type:actionTypes.ADD_TODO,
        payload:'test22'
      })
    ).toEqual([{id:1,title:'test22',completed:false},{id:0,title:'test',completed:false}])
  });
  it('should handle REMOVE_TODO', () => {
    expect(
      todos([{id:0,title:'test',completed:false}],{
        type:actionTypes.REMOVE_TODO,
        payload:{id:0,title:'test',completed:false}
      })
    ).toEqual([])
  });
  it('should handle TOGGLE_TODO', () => {
    expect(
      todos([{id:0,title:'test',completed:false}],{
        type:actionTypes.TOGGLE_TODO,
        payload:0
      })
    ).toEqual([{id:0,title:'test',completed:true}])

    expect(
      todos([{id:0,title:'test',completed:false},{id:1,title:'test',completed:false}],{
        type:actionTypes.TOGGLE_TODO,
        payload:0
      })
    ).toEqual([{id:0,title:'test',completed:true},{id:1,title:'test',completed:false}])
  });
  it('should handle FETCH_TODOS',() => {
    expect(
      todo([],{
        type:actionTypes.FETCH_TODOS,
        payload:{data:[{id:0,title:'test',completed:false}]}
      })
    ).toEqual([{id:0,title:'test',completed:false}])
  })
});