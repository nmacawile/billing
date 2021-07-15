class UsersController < ApplicationController
  respond_to :json
  
  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    cred = { message: 'Account created successfully', auth_token: auth_token }
    json_response cred, :created
  end

  private

  def user_params
    params.permit(:email, :password)
  end
end
