import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

let Task = ReactRailsUJS.getConstructor("Task")

class Tasks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: this.props.tasks,
      newTaskName: '',
      error: false
    }
  }

  validateName(name) {
    return name.length > 0
  }

  createTask(event) {
    var that = this
    if (!this.validateName(this.state.newTaskName)) {
      that.setState({error: true})
      return
    }
    axios.post('/tasks', {
      task: {
        name: this.state.newTaskName,
        project_id: this.props.projectId
      }
    }).then(function (response) {
      console.log(response)
      that.setState({
        newTaskName: '',
        tasks: that.state.tasks.concat([response.data]),
        error: false
      })
    }).catch(function (error) {
      console.log(error)
      that.setState({errorClass: true})
    })
  }

  swap(arr, index1, index2) {
    let tmp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = tmp
    return arr
  }

  taskPriorityMove(direction, index) {
    if (direction == 'up') {
      if (index > 0) {
        this.setState({tasks: this.swap(this.state.tasks.slice(), index - 1, index)})
      }
    } else if (direction == 'down') {
      if (index < this.state.tasks.length - 1) {
        this.setState({tasks: this.swap(this.state.tasks.slice(), index + 1, index)})
      }
    } else {
      throw 'Can\'t move priority (bad direction)'
    }
  }

  deleteTask(index) {
    var newTasks = this.state.tasks.slice()
    newTasks.splice(index, 1)
    this.setState({tasks: newTasks})
  }

  handleNewNameChange(event) {
    this.setState({newTaskName: event.target.value})
  }

  handleNewNameKeyPress(event) {
    let keyCode = event.which || event.keyCode
    if(keyCode == 13) {
      this.createTask(event)
      return false
    }
    return true
  }

  render () {
    return (
      <div className="tasks">
        <div className="input-group">
          <span className="input-group-btn">
            <button className="task-add-plus" onClick={(event) => this.createTask(event)}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
          </span>
          <input className="task-new-name form-control" data-error={this.state.error} value={this.state.newTaskName}
            onChange={(event) => this.handleNewNameChange(event)}
            onKeyPress={(event) => this.handleNewNameKeyPress(event)} />
          <span className="input-group-btn">
            <button className="task-add" onClick={(event) => this.createTask(event)}>
              Add Task
            </button>
          </span>
        </div>

        <ul>
          {this.state.tasks.map((task, index) => {

            return (
              <li key={task.id}>
                <Task id={task.id} name={task.name} status={task.status}
                  deleteSelfFromTasks={() => { this.deleteTask(index) }}
                  priorityMove={(direction) => { this.taskPriorityMove(direction, index) }} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

Tasks.propTypes = {
  tasks: PropTypes.array,
  projectId: PropTypes.number
}

export default Tasks
