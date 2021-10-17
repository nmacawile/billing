class PeriodDepartmentItemsController < ApplicationController
  before_action :load_department
  before_action :load_department_item, only: [:show, :update, :destroy]

  def index
    department_items = @department.period_department_items
    json_response department_items
  end

  def show
    json_response @department_item
  end

  def create
    department_item = @department.period_department_items
      .create!(department_item_params)
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
      .require(:period_department_item)
        .permit(
          :name,
          :price,
          :days,
          :quantity,
          :total_copies,
          :total_deductions,
          days_off: [])
  end

  def load_department
    billing = PeriodicBilling.find(params[:periodic_billing_id])
    period = billing.periods.find(params[:period_id])
    @department = 
      period
       .period_departments
         .find(params[:period_department_id])
  end

  def load_department_item
    @department_item = 
      @department.period_department_items
        .find(params[:id])
  end
end
