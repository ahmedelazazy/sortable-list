import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, testStore } from '../utils';
import { Posts } from './Posts';
import moxios from 'moxios';
import { types } from '../actionTypes'

const setUp = (props = {}) => {
  const store = testStore();

  const component = shallow(<Posts store={store} {...props} />);
  return component;
};

describe('<Posts />', () => {

  let component;
  beforeEach(() => {
    component = setUp({ posts: [] });
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAtrr(component, 'posts');
    expect(wrapper.length).toBe(1);
  });

});



describe('Should load posts and update store', () => {
  const store = testStore();

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is updated correctly', () => {

    const expectedState = [{
      id: 1,
    }, {
      id: 2,

    }, {
      id: 3,
    }];
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState
      })
    });

    store.dispatch({ type: types.GET_POSTS, payload: { posts: expectedState } })
    const newState = store.getState();
    expect(newState.present.posts).toBe(expectedState);
  });

});