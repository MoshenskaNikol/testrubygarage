import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'

let Project = ReactRailsUJS.getConstructor("Project")

class Projects extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: this.props.projects,
    }
  }

  createProject(event) {
    var that = this
    axios.post('/projects', {
      project: {
        name: 'My Project',
      }
    }).then(function (response) {
      console.log(response)
      var newProject = response.data
      newProject.tasks = []
      that.setState({projects: that.state.projects.concat([newProject])})
    }).catch(function (error) {
      console.log(error)
    })
  }

  deleteProject(index) {
    var newProjects = this.state.projects.slice()
    newProjects.splice(index, 1)
    this.setState({projects: newProjects})
  }

  render () {
    return (
      <div className="projects">
        <ul>
          {this.state.projects.map((project, index) => {
            return (
              <li key={project.id}>
                <Project id={project.id} name={project.name} tasks={project.tasks}
                  deleteSelfFromProjects={() => { this.deleteProject(index) }} />
              </li>
            )
          })}
        </ul>
        <button className="project-add" onClick={(event) => this.createProject(event)}>
          Add TODO List
        </button>
      </div>
    )
  }
}

Projects.propTypes = {
  projects: PropTypes.array
}

export default Projects
