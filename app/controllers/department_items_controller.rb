class DepartmentItemsController < ApplicationController
  before_action :load_department
  before_action :load_department_item, only: [:show, :update, :destroy]

  def index
    @department_items = @department.department_items
    json_response @department_items
  end

  def show
    json_response @department_item
  end

  def create
    department_item = 
      @department.department_items.create!(department_item_params)
    json_response({ id: department_item.id.to_s }, :created)
  end

  def update
    @department_item.update!(department_item_params)
  end

  def destroy
    @department_item.destroy
  end
  
  private

  def department_item_params
    params
      .require(:department_item)
      .permit(
        :position,
        :item,
        :days,
        :price,
        :quantity,
        deductions: 
          [:mon, :tue, :wed, :thu, :fri, :sat, :sun])
  end

  def load_department
    @template = Template.find(params[:template_id])
    @department = @template
                    .departments
                    .find_by(id: params[:department_id])
  end

  def load_department_item
    @department_item = 
      @department.department_items.find_by(id: params[:id])
  end
end
