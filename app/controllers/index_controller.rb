class IndexController < AuthenticatedController
  def index
    @projects = current_user.projects.includes(:tasks)
    @projects_json = @projects.map do |project|
      project.as_json.merge({tasks: project.tasks.find(project.priority).as_json})
    end
  end
end
