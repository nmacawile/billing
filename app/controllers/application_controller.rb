class ApplicationController < ActionController::Base
  include ExceptionHandler
  include Response

  skip_before_action :verify_authenticity_token
end
