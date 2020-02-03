import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Flipper } from 'react-flip-toolkit'
import { types } from '../actionTypes'
import axios from 'axios';
import Post from './Post'
export class Posts extends Component {
  state = {
    isLoading: false
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(res => {
        this.setState({ isLoading: false });
        this.props.getPosts(res.data);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
        this.props.getPosts([]);
      })
  }

  render() {
    const { posts } = this.props;
    let ids = posts.map(p => p.id).join(",");

    return (
      <div className="posts" data-test="posts">
        <h5 className="text-2xl my-4 text-white font-normal">Sortable Post List</h5>

        {this.state.isLoading ?
          <div className="loader" /> : (
            <Flipper spring='gentle' flipKey={ids}>
              {
                posts.length ? (
                  posts.map((post, i) => (
                    <Post key={post.id} post={post} index={i} showUp={i !== 0} showDown={i !== posts.length - 1} />
                  ))) : (
                    <div className="center">No posts to show</div>
                  )
              }
            </Flipper>
          )
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.present.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: (posts) => dispatch({ type: types.GET_POSTS, payload: { posts } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts)


