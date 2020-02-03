import React from 'react'
import { connect } from 'react-redux'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Flipped } from 'react-flip-toolkit'
import { types } from '../actionTypes'



export const Post = (props) => {

  const handleClick = (id, direction, post) => {
    props.move(id, direction, post);
  }

  return (
    <Flipped key={props.post.id} flipId={props.post.id} className="post" data-test="post">
      <div className="my-2 px-4 py-4 bg-gray-100 flex justify-between shadow rounded">
        <div className="flex-1 flex items-center text-gray-700">{props.post.title}</div>
        <div className="flex-5 flex flex-col items-end flex items-center text-gray-600 text-l">
          {props.showUp === true && <button className="btn-move-up my-1 focus:outline-none" onClick={() => handleClick(props.index, 'Up', props.post)}><FaAngleUp /></button>}
          {props.showDown === true && <button className="btn-move-down my-1 focus:outline-none" onClick={() => handleClick(props.index, 'Down', props.post)}><FaAngleDown /></button>}
        </div>
      </div>
    </Flipped>
  )
};

const mapDispatchToProps = (dispatch) => ({
  move: (index, direction, post) => dispatch({ type: types.MOVE, payload: { index, direction, post } }),
});

export default connect(null, mapDispatchToProps)(Post)


