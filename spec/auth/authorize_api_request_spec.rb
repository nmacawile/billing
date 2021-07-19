require 'rails_helper'

RSpec.describe AuthorizeApiRequest do
  let(:user) { create :user }
  let(:valid_headers) { authorized_request_headers(user.id) }
  let(:invalid_headers) { authorized_request_headers(-9999) }
  let(:expired_headers) { expired_request_headers(user.id) }
  let(:fake_headers) { { **request_headers, 'Authorization' => 'foobar1234' } }
  subject(:valid_request_object) { described_class.new(valid_headers) }
  subject(:invalid_request_object) { described_class.new(invalid_headers) }
  subject(:expired_token_request_object) { described_class.new(expired_headers) }
  subject(:missing_token_request_object) { described_class.new(request_headers) }
  subject(:fake_token_request_object) { described_class.new(fake_headers) }


  describe '#call' do
    context 'when valid request' do
      it 'returns the user object' do
        decoded_user_object = valid_request_object.call[:user]
        expect(decoded_user_object).to eq user
      end
    end

    context 'when token is expired' do
      it 'raises an ExpiredToken error' do
        expect { expired_token_request_object.call }.to(
          raise_error(ExceptionHandler::InvalidToken, 'Signature has expired')
        )
      end
    end

    context 'when token\'s decrypted user id is invalid' do
      it 'raises an InvalidToken error' do
        expect { invalid_request_object.call }.to(
          raise_error(ExceptionHandler::InvalidToken, /Invalid token/)
        )
      end
    end

    context 'when token is missing' do
      it 'raises a MissingToken error' do
        expect { missing_token_request_object.call }.to(
          raise_error(ExceptionHandler::MissingToken, 'Missing token')
        )
      end
    end

    context 'when token is fake' do
      it 'raises a InvalidToken error' do
        expect { fake_token_request_object.call }.to(
          raise_error(ExceptionHandler::InvalidToken, 'Not enough or too many segments')
        )
      end
    end
  end
end
