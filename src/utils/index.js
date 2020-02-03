import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer'

export const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const testStore = (initialState) => {
  return createStore(rootReducer, initialState);

};