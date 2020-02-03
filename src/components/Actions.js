
import React from 'react'
import { connect } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { Flipper, Flipped } from 'react-flip-toolkit'

export const Actions = (props) => {

  const handleClick = (index) => {
    props.timeTravel(index * -1);
  }

  const { actions } = props
  let ids = actions.map(a => a.id).join(",");

  return (
    <div className="actions bg-gray-100 shadow rounded" data-test="actions">
      <div className="text-xl text-gray-800 bg-white p-4 rounded font-normal">List of actions commited</div>
      <Flipper spring='gentle' flipKey={ids} className="p-6">
        {
          actions.length ? (
            actions.map((action, i) => (
              <Flipped key={action.id} flipId={action.id} className="post" data-test="post">
                <div className="bg-white p-4 my-1 shadow flex justify-between rounded items-center">
                  <div className="flex items-center text-gray-700 ">{action.title}</div>
                  <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none min-w-fit-content text-sm text-gray-800" onClick={() => handleClick(i + 1)}>Time Travel</button>
                </div>
              </Flipped>
            ))) : (
              <div className="p-4 text-gray-700">No actions</div>
            )
        }
      </Flipper>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    actions: state.present.actions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    timeTravel: (index) => dispatch(UndoActionCreators.jump(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions)


