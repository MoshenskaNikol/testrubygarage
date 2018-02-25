class TasksController < AuthenticatedController
  before_action :set_task, except: [:create]

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        project = @task.project
        project.priority = project.priority + [@task.id]
        project.save
        format.json { render :show, status: :created, location: @task }
      else
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.json { render :show, status: :ok, location: @task }
      else
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    project = @task.project
    @task.destroy
    project.priority = project.priority - [@task.id]
    project.save
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def priority_up
    project = @task.project
    index = project.priority.index @task.id
    if index > 0
      prior = project.priority
      prior[index], prior[index - 1] = prior[index - 1], prior[index]
      project.priority = prior
      project.save
      render plain: 'Moved up', status: :ok
    else
      render plain: 'Already at top', status: :ok
    end
  end

  def priority_down
    project = @task.project
    index = project.priority.index @task.id
    if index < project.priority.length - 1
      prior = project.priority
      prior[index], prior[index + 1] = prior[index + 1], prior[index]
      project.priority = prior
      project.save
      render plain: 'Moved down', status: :ok
    else
      render plain: 'Already at bottom', status: :ok
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.includes(:project).find(params[:id])
      if @task.project.user != current_user
        render plain: '', status: :forbidden
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:task).permit(:name, :status, :project_id)
    end
end
