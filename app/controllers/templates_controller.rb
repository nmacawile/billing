class TemplatesController < ApplicationController
  before_action :load_template, only: [:show, :update, :destroy]
  respond_to :json

  def index
    @templates = Template.all
    json_response @templates
  end

  def show
    json_response @template
  end

  def create
    @template = Template.create!(new_template_params)
    head :created
  end

  def update
    @template.update!(edit_template_params)
    head :no_content
  end

  def destroy
    @template.destroy
    head :no_content
  end

  private

  def new_template_params
    params
      .require(:template)
      .permit(
        :name,
        :_paper_size,
        departments: [
          :name,
          department_items: [
            :days,
            :item,
            :quantity,
            :position,
            :price,
            deduction: {}
          ]
        ],
        client: [:name, :address]
      )
  end

  def edit_template_params
    params
      .require(:template)
      .permit(
        :name,
        :_format,
        client: [:name, :address])
  end

  def load_template
    @template = Template.find(params[:id])
  end
end
