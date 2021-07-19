require 'rails_helper'

RSpec.describe JsonWebToken do
  let!(:token_payload) { { message: 'Hello World!!!' } }
  let!(:token) { described_class.encode(token_payload) }

  describe '::encode' do
    it 'generates a token from the payload' do
      expect(described_class.encode(token_payload)).not_to be nil
    end
  end

  describe '::decode' do
    it 'decrypts the token and rebuilds the original data' do
      expect(described_class.decode(token)[:message]).to eq token_payload[:message]
    end
  end
end
