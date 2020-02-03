import { types } from '../actionTypes';
import rootReducer from './rootReducer';

describe('Root Reducer', () => {

  it('Should return default state', () => {
    const newState = rootReducer();
    expect(newState.present).toEqual({
      posts: [],
      actions: []
    });
  });

  it('Should move up and add action', () => {
    const posts = [{ id: '1', title: 'Post 1' }, { id: '2', title: 'Post 2' }, { id: '3', title: 'Post 3' }];
    const newState = rootReducer({ posts, actions: [] }, {
      type: types.MOVE,
      payload: { index: 1, post: { id: '2', title: 'Post 2' }, direction: 'Up' }
    });
    expect(newState.present.actions).toEqual(expect.arrayContaining([{ id: 0, title: 'Moved Post 2 from 1 to 0' }]));
  });


});