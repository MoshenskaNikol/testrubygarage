import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

class Task extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.name,
      status: this.props.status,
      editing: false,
      error: false
    }
  }

  handleNameKeyPress(event) {
    let keyCode = event.which || event.keyCode
    if(keyCode == 13) {
      this.handleNameSubmit(event)
      return false
    }
    return true
  }

  validateName(name) {
    return name.length > 0
  }

  handleNameChange (event) {
    this.setState({name: event.target.value})
  }

  handleNameSubmit (event) {
    var that = this
    if (!this.validateName(this.state.name)) {
      that.setState({error: true})
      event.target.focus()
      return
    }
    axios.patch('/tasks/' + this.props.id, {
      task: {
        name: this.state.name
      }
    }).then(function (response) {
      console.log(response)
      that.setState({editing: false, error: false})
    }).catch(function (error) {
      console.log(error)
      that.setState({error: true})
    })
  }

  handlePriorityMove(direction, event) {
    var that = this
    axios.post('/tasks/priority_' + direction + '/' + this.props.id)
    .then(function (response) {
      console.log(response)
      that.props.priorityMove(direction)
    }).catch(function (error) {
      console.log(error)
    })
  }

  handleStatusSubmit (event) {
    var that = this
    var newStatus = event.target.checked
    axios.patch('/tasks/' + this.props.id, {
      task: {
        status: newStatus
      }
    }).then(function (response) {
      console.log(response)
      that.setState({status: newStatus})
    }).catch(function (error) {
      console.log(error)
    })
  }

  getNameField() {
    if (this.state.editing) {
      return (<input autoFocus className="task-name-edit form-control input-sm"
        type="text" value={this.state.name} data-error={this.state.error}
        onChange={(event) => this.handleNameChange(event)}
        onFocus={(event) => event.target.select()}
        onKeyPress={(event) => this.handleNameKeyPress(event)}
        onBlur={(event) => this.handleNameSubmit(event)} />)
    } else {
      return <h4 className="task-name">{this.state.name}</h4>
    }
  }

  getStatusField() {
    return (
      <input className="task-status" type="checkbox" defaultChecked={this.state.status}
        onChange={(event) => this.handleStatusSubmit(event)}/>
    )
  }

  deleteTask() {
    var that = this
    axios.delete('/tasks/' + this.props.id)
    .then(function (response) {
      console.log(response)
      that.props.deleteSelfFromTasks()
    }).catch(function (error) {
      console.log(error)
    })
  }

  render () {
    return (
      <div className="task">
        {this.getStatusField()}
        {this.getNameField()}
        <div className="task-controls">
          <a className="task-priority-move-up" onClick={(event) => this.handlePriorityMove('up', event)}>
            <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
          </a>
          <a className="task-priority-move-down" onClick={(event) => this.handlePriorityMove('down', event)}>
            <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
          </a>
          <a className="task-edit" onClick={() => {
            this.setState({editing: true})
          }}>
            <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
          </a>
          <a className="task-delete" onClick={(event) => this.deleteTask(event)}>
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    )
  }
}

Task.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  status: PropTypes.bool,
  deleteSelfFromTasks: PropTypes.func.isRequired,
  priorityMove: PropTypes.func.isRequired,
}

export default Task
