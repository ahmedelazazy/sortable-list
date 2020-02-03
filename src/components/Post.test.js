import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, testStore } from '../utils';
import { Post } from './Post';

const setUp = (props = {}) => {
  const store = testStore();

  const component = shallow(<Post store={store} {...props} />);
  return component;
};

describe('<Post />', () => {

  let component;
  beforeEach(() => {
    component = setUp({ post: { id: 1, title: "post title" }, index: 1 });
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAtrr(component, 'post');
    expect(wrapper.length).toBe(1);
  });

  it('Should render only the up button', () => {
    component = setUp({ post: { id: 1, title: "post title" }, index: 1, showUp: true });
    const upWrapper = component.find("FaAngleUp");
    expect(upWrapper.length).toBe(1);

    const downWrapper = component.find("FaAngleDown");
    expect(downWrapper.length).toBe(0);
  });

  it('Should render only the down button', () => {
    component = setUp({ post: { id: 1, title: "post title" }, index: 1, showDown: true });
    const downWrapper = component.find("FaAngleDown");
    expect(downWrapper.length).toBe(1);

    const upWrapper = component.find("FaAngleUp");
    expect(upWrapper.length).toBe(0);
  });

  it('Should render both buttons', () => {
    component = setUp({ post: { id: 1, title: "post title" }, index: 1, showUp: true, showDown: true });
    const downWrapper = component.find("FaAngleDown");
    expect(downWrapper.length).toBe(1);

    const upWrapper = component.find("FaAngleUp");
    expect(upWrapper.length).toBe(1);
  });

});