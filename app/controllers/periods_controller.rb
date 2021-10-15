class PeriodsController < ApplicationController
  before_action :load_billing
  before_action :load_period, only: [:show, :update, :destroy]

  def index
    periods = @billing.periods
    json_response periods
  end

  def show
    json_response @period
  end

  def create
    period = @billing.periods.create!(period_params)
    json_response({ id: period.id.to_s }, :created)
  end

  def update
    @period.update!(period_params)
  end

  def destroy
    @period.destroy
    head :no_content
  end

  private

  def period_params
    params.require(:period)
      .permit(:start_date, :end_date, days_off: [])
  end

  def load_billing
    @billing = 
      PeriodicBilling
        .find(params[:periodic_billing_id])
  end

  def load_period
    @period = @billing.periods.find(params[:id])
  end
end
