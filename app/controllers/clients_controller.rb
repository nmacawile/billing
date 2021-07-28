class ClientsController < ApplicationController
  respond_to :json

  def index
    @clients = Client.all
    json_response @clients
  end

  def create
    @client = Client.create!(client_params)
    head :created
  end

  private

  def client_params
    params.require(:client).permit(:name, :address)
  end
end
