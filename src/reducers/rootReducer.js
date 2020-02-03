import undoable from 'redux-undo'
import { types } from '../actionTypes';


const initState = {
  posts: [],
  actions: [],
}



const rootReducer = (state = initState, action) => {

  switch (action.type) {
    case types.MOVE:
      let posts = state.posts.slice();
      let { index, post, direction } = action.payload;
      let newIndex = index;
      if (direction === 'Up') {
        [posts[index], posts[index - 1]] = [posts[index - 1], posts[index]];
        newIndex = index - 1;
      } else {
        [posts[index], posts[index + 1]] = [posts[index + 1], posts[index]];
        newIndex = index + 1;
      }

      let actions = state.actions.slice();
      actions.unshift({ id: actions.length, title: `Moved ${post.title} from ${index} to ${newIndex}` })

      return {
        ...state,
        posts,
        actions
      }

    case types.GET_POSTS:
      let fetchedPosts = action.payload.posts;
      return {
        ...state,
        posts: fetchedPosts
      }

    default:
      return state;
  }

}

export default undoable(rootReducer)