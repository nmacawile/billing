class DepartmentsController < ApplicationController
  before_action :load_template
  before_action :load_department, only: [:show, :update, :destroy]

  def index
    @departments = @template.departments
    json_response @departments
  end

  def show
    json_response @department
  end

  def create
    department = @template.departments.create!(department_params)
    json_response({ id:  department.id.to_s }, :created)
  end

  def update
    @department.update!(department_params)
  end

  def destroy
    @department.destroy
  end

private
  def department_params
    params.require(:department).permit(:name)
  end

  def load_department
    @department = @template.departments.find_by(id: params[:id])
  end

  def load_template
    @template = Template.find(params[:template_id])
  end
end
