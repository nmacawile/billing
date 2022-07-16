require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  let(:valid_registration) { { user: { email: 'foobar1234@email.com', password: 'password1234' } } }
  let(:invalid_registration) { { user: { email: 'foobar1234@email.com', password: '' } } }

  describe 'POST /users', skip: 'no user authorization system in place' do    
    context 'when valid request' do
      before { post '/users', params: valid_registration }

      it 'creates a user' do
        expect(response).to have_http_status 201
      end

      it 'returns an authentication token' do
        expect(json['auth_token']).not_to be_nil
      end

      it 'returns the user email' do
        expect(json['email']).to eq valid_registration[:email]
      end

      it 'returns a \'success\' message' do
        expect(json['message']).to match /Account created successfully/
      end
    end

    context 'when invalid registration' do
      before { post '/users', params: invalid_registration }

      it 'doesn\'t create a user' do
        expect(response).to have_http_status 422
      end
    end
  end
end
