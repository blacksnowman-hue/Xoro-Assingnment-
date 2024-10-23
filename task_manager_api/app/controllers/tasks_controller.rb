class TasksController < ApplicationController
    # Create a new task
    def create
      @task = Task.new(task_params)
  
      if @task.save
        render json: @task, status: :created
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end
  
    # List all tasks
    def index
      @tasks = Task.all
      render json: @tasks
    end
  
    # Update a task
    def update
      @task = Task.find(params[:id])
  
      if @task.update(task_params)
        render json: @task
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end
  
    # Delete a task
    def destroy
      @task = Task.find(params[:id])
      @task.destroy
      head :no_content
    end
  
    private
  
    def task_params
      params.require(:task).permit(:title, :description)
    end
  end
  