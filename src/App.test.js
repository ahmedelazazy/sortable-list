import App from './App';
import { shallow } from 'enzyme';
import { findByTestAtrr, testStore } from './utils';
import React from 'react';

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<App store={store} />);
  return wrapper;
};

describe('<App />', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it('Should render without errors', () => {
    const component = findByTestAtrr(wrapper, 'app');
    expect(component.length).toBe(1);
  });
});