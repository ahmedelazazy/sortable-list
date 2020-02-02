
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

class Actions extends Component {

  handleClick = (index) => {
    this.props.timeTravel(index * -1);
  }

  render() {
    const { actions } = this.props
    const actionsList = actions.length ? (
      actions.map((action, i) => {
        return (
          <div className="bg-white p-4 my-1 shadow flex justify-between rounded" key={Math.random()}>

            <div className="flex items-center text-gray-700 ">{action.title}</div>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={() => this.handleClick(i + 1)}>Time Travel</button>

          </div>
        )
      })
    ) : (
        <div className="p-4 text-gray-700">No actions</div>
      );

    return (
      <div className="bg-gray-200 rounded">
        <div className="text-xl text-gray-800 bg-gray-100 p-4 rounded font-normal">List of actions commited</div>
        <div className="p-6">
          {actionsList}
        </div>
      </div>
    )
  }
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


