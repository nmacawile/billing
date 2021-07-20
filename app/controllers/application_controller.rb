class ApplicationController < ActionController::Base
  include ExceptionHandler
  include Response
  
  before_action :authorize_request
  skip_before_action :verify_authenticity_token

  def authorize_request
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
  end
end
