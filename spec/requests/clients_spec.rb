require 'rails_helper'

RSpec.describe "Clients API", type: :request do
  let(:user) { create :user }
  let(:headers) { authorized_request_headers(user.id) }
  let!(:clients) { create_list :client, 10 }
  let(:client_ids) { clients.map { |c| c.id.to_s } }
  let(:new_client) { build :client }

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

  describe 'POST /clients' do
    before do
      post '/clients',
           params: {
             client: {
               name: new_client.name,
               address: new_client.address
             }
           }.to_json,
           headers: headers
    end

    it 'increases the templates count by 1' do
      expect(Client.count).to eq 11
    end

    it 'returns status code 201' do
      expect(response).to have_http_status 201
    end
  end
end
