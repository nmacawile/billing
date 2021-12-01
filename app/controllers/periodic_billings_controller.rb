class PeriodicBillingsController < ApplicationController
  before_action :load_billing, only: [:show, :destroy, :update]

  def index
    @billings = PeriodicBilling.all
    json_response @billings
  end

  def show
    json_response @billing
  end

  def create
    billing = PeriodicBilling.create!(billing_params)
    json_response({ id: billing.id.to_s }, :created)
  end

  def update
    @billing.update!(billing_params)
  end

  def destroy
    @billing.destroy
  end

  private

  def billing_params
    params.require(:periodic_billing)
    .permit(:start_date,
            :end_date,
            :template,
            :client_name,
            :client_address,
            :format)
  end

  def load_billing
    @billing = PeriodicBilling.find(params[:id])
  end
end
