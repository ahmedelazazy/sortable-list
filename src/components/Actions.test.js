import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, testStore } from '../utils';
import { Actions } from './Actions';
import { Post } from './Post';
import { types } from '../actionTypes'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const store = testStore({ posts: [{ id: "1", title: "Post 1" }, { id: "2", title: "Post 2" }, { id: "3", title: "Post 3" }], actions: [] });

const setUp = (props = {}) => {
  const component = shallow(<Actions store={store} {...props} />);
  return component;
};

describe('<Actions />', () => {

  it('Should render without errors', () => {
    let component = setUp({ actions: [] });
    const wrapper = findByTestAtrr(component, 'actions');
    expect(wrapper.length).toBe(1);
  });

  it('Should perform time travel', () => {
    let moveFn = (index, direction, post) => store.dispatch({ type: types.MOVE, payload: { index, direction, post } })
    let postProps = { post: { id: 1, title: "post title" }, index: 0, showDown: true, move: moveFn };
    let postComponent = shallow(<Post store={store} {...postProps} />);
    postComponent.find('.btn-move-down').simulate('click');
    expect(store.getState().present.posts[1].id).toBe("1");

    let timeTravelFn = (index) => store.dispatch(UndoActionCreators.jump(index))
    let actionProps = { actions: [{ id: 1, title: 'action 1' }], timeTravel: timeTravelFn };
    let actionComponent = shallow(<Actions store={store} {...actionProps} />);
    actionComponent.find('button').simulate('click');
    expect(store.getState().present.actions.length).toBe(0);
    expect(store.getState().present.posts[0].id).toBe("1");
  });

});