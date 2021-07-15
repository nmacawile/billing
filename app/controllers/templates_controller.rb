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
    client = Client.find(params[:client_id])
    @template = Template.new(template_params)
    @template.client = client
    @template.save!
    head :created
  end

  def update
    @template.update!(template_params)
    head :no_content
  end

  def destroy
    @template.destroy
    head :no_content
  end

  private

  def template_params
    params.require(:template).permit(:name, :save_name)
  end

  def update_template_params
    params.require(:template).permit(:name, :save_name)
  end

  def load_template
    @template = Template.find(params[:id])
  end
end
