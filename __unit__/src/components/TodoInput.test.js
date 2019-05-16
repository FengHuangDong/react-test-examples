import React from 'react';
import {TodoInput} from "../../../src/components/TodoInput"
import {shallow} from 'enzyme'
import toJson from "enzyme-to-json"


describe('TodoInput Components', () => {
  let mockProps,wrapper
  beforeEach(() => {
    mockProps = {
      handleSubmit:jest.fn()
    }
    wrapper = shallow(<TodoInput {...mockProps} />)
  })
  it('should render component', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should submit handle to form ', () => {
    wrapper.find("form").simulate('submit')
    expect(mockProps.handleSubmit).toHaveBeenCalled();
  });
})