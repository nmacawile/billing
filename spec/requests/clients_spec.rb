require 'rails_helper'

RSpec.describe "Clients API", type: :request do
  let(:user) { create :user }
  let(:headers) { authorized_request_headers(user.id) }
  let!(:clients) { create_list :client, 10 }
  let(:client_ids) { clients.map { |c| c.id.to_s } }

  describe "GET /clients" do
    before do
      get '/clients', headers: headers
    end

    it 'returns a list of clients' do
      expect(json.size).to eq clients.size
      expect(client_ids).to match_array json_ids
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end
end
