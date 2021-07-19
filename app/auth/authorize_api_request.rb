class AuthorizeApiRequest
  attr_reader :headers

  def initialize(headers)
    @headers = headers
  end

  def call
    { user: user }
  end

  private

  def user
    @user = User.find(decoded_token_auth[:user_id]) if decoded_token_auth

  rescue Mongoid::Errors::DocumentNotFound => e
    raise ExceptionHandler::InvalidToken, "Invalid token: #{e.message}"
  end

  def decoded_token_auth
    @decoded_token_auth ||= JsonWebToken.decode(http_auth_headers)
  end

  def http_auth_headers
    if headers['Authorization'].present?
      return headers['Authorization'].split(' ').last
    end
    raise ExceptionHandler::MissingToken, 'Missing token'
  end
end
