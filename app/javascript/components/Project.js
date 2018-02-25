import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'

let Tasks = ReactRailsUJS.getConstructor("Tasks")

class Project extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.name,
      editing: false,
      error: false
    }
  }

  validateName(name) {
    return name.length > 0
  }

  handleNameKeyPress(event) {
    let keyCode = event.which || event.keyCode
    if(keyCode == 13) {
      this.handleNameSubmit(event)
      return false
    }
    return true
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
    axios.patch('/projects/' + this.props.id, {
      project: {
        name: this.state.name,
      }
    }).then(function (response) {
      console.log(response)
      that.setState({editing: false, error: false})
    }).catch(function (error) {
      console.log(error)
      that.setState({error: true})
    })
  }

  getNameField() {
    if (this.state.editing) {
      return (<input autoFocus className="project-name-edit form-control"
        type="text" value={this.state.name} data-error={this.state.error}
        onChange={(event) => this.handleNameChange(event)}
        onFocus={(event) => event.target.select()}
        onKeyPress={(event) => this.handleNameKeyPress(event)}
        onBlur={(event) => this.handleNameSubmit(event)} />)
    } else {
      return <h3 className="project-name">{this.state.name}</h3>
    }
  }

  deleteProject() {
    var that = this
    axios.delete('/projects/' + this.props.id)
    .then(function (response) {
      console.log(response)
      that.props.deleteSelfFromProjects()
    }).catch(function (error) {
      console.log(error)
    })
  }

  render () {
    return (
      <div className="project">
        <div className="panel panel-primary">
          <div className="panel-heading">
            {this.getNameField()}
            <div className="project-controls">
              <a className="project-edit" onClick={() => {
                this.setState({editing: true})
              }}>
                <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
              </a>
              <a className="project-delete" onClick={(event) => this.deleteProject(event)}>
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </a>
            </div>
          </div>
          <div className="panel-body">
            <Tasks tasks={this.props.tasks} projectId={this.props.id} />
          </div>
        </div>
      </div>
    )
  }
}

Project.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  tasks: PropTypes.array,
  deleteSelfFromProjects: PropTypes.func.isRequired
}

export default Project
