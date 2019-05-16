import React from 'react';
import {TodoList, getVisibleTodos} from "../../../src/components/TodoList"
import {shallow} from 'enzyme'
import toJson from "enzyme-to-json"
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../../../src/actions/actionsTypes";

const mockTodos = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
  }
]

describe('TodoList', () => {
  let mockProps, wrapper
  beforeEach(() => {
    mockProps = {
      actions:{
        removeFromList:jest.fn(),
        setVisibilityFilter:jest.fn(),
        toogleTodo:jest.fn()
      },
      todos:mockTodos,
      visibilityFilter:SHOW_ALL
    }
    wrapper = shallow(<TodoList {...mockProps} />)
  });
  it('should render component', () => {
    let todoList = wrapper.find('tbody tr')
    expect(todoList.length).toEqual(mockProps.todos.length)
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should not todo data render', () => {
    wrapper.setProps({ todos: [] });
    expect(wrapper.find(".alert-danger")).toHaveLength(1);
  });
  it('should action to be call when visibility filter click', () => {
    wrapper.find(".breadcrumb-item").map($li => {
      $li.simulate('click');
      expect(mockProps.actions.setVisibilityFilter).toHaveBeenCalled();
    })
  });
  it('should filter active when set visibilityFilter props', () => {
    wrapper.setProps({visibilityFilter: SHOW_COMPLETED})
    expect(wrapper.find(".breadcrumb-item").at(1).hasClass("active")).toEqual(true)
    wrapper.setProps({visibilityFilter: SHOW_ACTIVE})
    expect(wrapper.find(".breadcrumb-item").at(2).hasClass("active")).toEqual(true)
  })
  it('should remverFromList to be call when click icon',() => {
    wrapper.find(".fa-minus-circle").at(0).simulate("click")
    expect(mockProps.actions.removeFromList).toHaveBeenCalled();
  })
  it('should toogleTodo to be call when click icon',() => {
    wrapper.find(".fa-check-circle").at(0).simulate("click")
    expect(mockProps.actions.toogleTodo).toHaveBeenCalled();
  })

});

describe('getVisibleTodos filter', () => {
  it('should SHOW_ALL todos', () => {
    expect(getVisibleTodos(mockTodos,SHOW_ALL)).toEqual(mockTodos);
  });
  it('should SHOW_COMPLETED todos', () => {
    expect(getVisibleTodos(mockTodos,SHOW_COMPLETED)).toEqual([{
      "userId": 1,
      "id": 4,
      "title": "et porro tempora",
      "completed": true
    }]);
  });
  it('should SHOW_ACTIVE todos', () => {
    expect(getVisibleTodos(mockTodos,SHOW_ACTIVE)).toEqual([
      {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      },
      {
        "userId": 1,
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
      },
      {
        "userId": 1,
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
      }]
    );
  });
  it('should error', () => {
    expect(()=>{getVisibleTodos(mockTodos,'test')}).toThrow();
  });
});