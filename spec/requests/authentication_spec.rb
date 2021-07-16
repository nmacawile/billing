require 'rails_helper'

RSpec.describe 'Authentication API', type: :request do
  describe 'POST /auth/login' do
    let!(:user) { create :user }
    let(:valid_credentials) do
       { email: user.email, password: user.password }
    end
    let(:invalid_credentials) do
       { email: user.email, password: user.password + 'oops' }
    end

    context('when request is valid') do
      before do
        post '/auth/login', params: valid_credentials
      end

      it 'returns an authentication token' do
        expect(json['auth_token']).not_to be_nil
      end
    end

    context('when request is invalid') do
      before do
        post '/auth/login', params: invalid_credentials
      end

      it 'doesn\'t return an authentication token' do
        expect(json['auth_token']).to be_nil
      end

      it 'returns a status code 401' do
        expect(response).to have_http_status 401
      end
    end
  end
end
