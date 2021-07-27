class ClientsController < ApplicationController
  respond_to :json
  
  def index
    @clients = Client.all
    json_response @clients
  end
end
