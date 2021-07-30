module ExceptionHandler
  extend ActiveSupport::Concern

  class AuthenticationError < StandardError; end
  class InvalidToken < StandardError; end
  class MissingToken < StandardError; end

  included do
    rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized_response
    rescue_from Mongoid::Errors::Validations, with: :unprocessable_response
    rescue_from ExceptionHandler::InvalidToken, with: :unauthorized_response
    rescue_from ExceptionHandler::MissingToken, with: :unauthorized_response
    rescue_from Mongoid::Errors::DocumentNotFound, with: :not_found_response
  end

  private
  
  # 401
  def unauthorized_response(e)
    json_response({ message: e.message }, :unauthorized)
  end

  # 404
  def not_found_response(e)
    json_response({ message: e.message }, :not_found)
  end

  # 422
  def unprocessable_response(e)
    json_response({ message: e.message }, :unprocessable_entity)
  end
end
