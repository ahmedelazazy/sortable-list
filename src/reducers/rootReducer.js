import undoable from 'redux-undo'


const initState = {
  posts: [
    { id: '1', title: 'Post 1', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat' },
    { id: '2', title: 'Post 2', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat' },
    { id: '3', title: 'Post 3', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat' },
    { id: '4', title: 'Post 4', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat' },
    { id: '5', title: 'Post 5', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat' }
  ],
  actions: [],
}



const rootReducer = (state = initState, action) => {
  if (action.type === 'move') {
    let posts = state.posts.slice();
    let { index, post, direction } = action.payload;
    let newIndex = index;
    if (direction == 'Up') {
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
  }


  return state;
}

export default undoable(rootReducer)