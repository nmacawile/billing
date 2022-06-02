class PeriodicBillingsController < ApplicationController
  before_action :load_billing, only: [:show, :destroy, :update]
  before_action :load_page_data, only: :index

  def index
    @billings = PeriodicBilling.skip(@total_skips).limit(20)
    json_response({ pages: @pages, billings: @billings })
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

  def load_page_data
    per_page = 20
    page = params[:page].to_i
    page = page < 1 ? 1 : page
    @total_skips = (page - 1) * per_page
    @pages = ((PeriodicBilling.count * 1.0) / per_page).ceil
  end

  def billing_params
    params.require(:periodic_billing)
    .permit(:start_date,
            :end_date,
            :template,
            :client_name,
            :client_address,
            :_format,
            :discount,
            :total,
            periods: [
              :start_date,
              :end_date,
              days_off: [],
              period_departments: [
                :name,
                period_department_items: [
                  :name,
                  :price,
                  :days,
                  :quantity,
                  :total_copies,
                  :total_deductions,
                  :amount,
                  days_off: []
                ]
              ]
            ])
  end

  def load_billing
    @billing = PeriodicBilling.find(params[:id])
  end
end
