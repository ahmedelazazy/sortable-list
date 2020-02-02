import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

class Home extends Component {

  handleClick = (id, direction, post) => {
    this.props.move(id, direction, post);
  }



  render() {
    const { posts } = this.props
    const postList = posts.length ? (
      posts.map((post, i) => {
        return (
          <div className="my-2 px-4 py-4 bg-gray-200 flex justify-between shadow rounded" key={post.id}>
            <div className="flex-1 flex items-center text-gray-700">{post.title}</div>
            <div className="flex-5 flex flex-col items-end flex items-center text-gray-600 text-l">
              {i != 0 && <button className="btn-move my-2 focus:outline-none" onClick={() => this.handleClick(i, 'Up', post)}><FaAngleUp /></button>}
              {i != posts.length - 1 && <button className="btn-move my-2 focus:outline-none" onClick={() => this.handleClick(i, 'Down', post)}><FaAngleDown /></button>}
            </div>
          </div>
        )
      })
    ) : (
        <div className="center">No posts to show</div>
      );

    return (
      <div>
        <h5 className="text-2xl my-4 text-white font-normal">Sortable Post List</h5>
        {postList}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.present.posts,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    move: (index, direction, post) => dispatch({ type: 'move', payload: { index, direction, post } }),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


