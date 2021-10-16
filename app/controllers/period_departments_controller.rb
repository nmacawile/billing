class PeriodDepartmentsController < ApplicationController
  before_action :load_period
  before_action :load_department, only: [:show, :destroy, :update]

  def index
    departments = @period.period_departments
    json_response departments
  end

  def show
    json_response @department
  end

  def destroy
    @department.destroy
  end

  def create
    department = @period.period_departments
      .create!(department_params)
    json_response({ id: department.id.to_s }, :created)
  end

  def update
    @department.update!(department_params)
  end

  private

  def department_params
    params.require(:period_department).permit(:name)
  end

  def load_period
    billing = PeriodicBilling.find(params[:periodic_billing_id])
    @period = billing.periods.find(params[:period_id])
  end

  def load_department
    @department = @period.period_departments.find(params[:id])
  end
end
