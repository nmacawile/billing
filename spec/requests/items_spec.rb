require 'rails_helper'

RSpec.describe 'Items API', type: :request do
  let(:user) { create :user }
  let(:headers) { authorized_request_headers(user.id)}
  let!(:items) { create_list :item, 10 }
  let(:item_ids) { Item.pluck(:id).map(&:to_s) }
  let(:random_item_name) { "Item #{rand(100)}" }
  let(:first_item) { items.first }
  let(:first_item_id) { first_item.id.to_s }

	describe 'GET /items' do
    before { get '/items', headers: headers }

    it 'returns the list of items' do
      expect(json.size).to eq(items.size)
      expect(item_ids).to match_array json_ids
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe 'GET /items/:id' do
    context 'when item exists' do
      before { get "/items/#{first_item_id}", headers: headers }

      it 'returns the item' do
        expect(json_id).to eq(first_item_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status 200
      end
    end

    context "when item doesn't exist" do
      before { get "/items/foobar", headers: headers }

      it "returns an error message" do
        expect(json['message']).to match /Document\(s\) not found/
      end

      it 'returns status code 404' do
        expect(response).to have_http_status 404
      end
    end
  end

  describe 'POST /items' do
    context 'when valid params' do
      before do
        post '/items',
              params: { 
                item: {
                  name: 'Example',
                  price: 20
                },
              }.to_json,
              headers: headers
      end

      it 'increases the items count by one' do
        expect(Item.count).to eq 11
      end

      it 'returns status code 201' do
        expect(response).to have_http_status 201
      end

      it 'returns the created item' do
        expect(item_ids).to include(json_id)
      end 
    end

    context 'when invalid params' do
      before do
        post '/items',
              params: { item: { name: '' } }.to_json,
              headers: headers
      end

      it 'returns an error message' do
        expect(json['message']).to match /Validation of Item failed./
      end

      it 'returns status code 422' do
        expect(response).to have_http_status 422
      end      
    end
  end

  describe 'PATCH /items/:id' do
    context 'when valid params' do
      before do
        patch "/items/#{first_item_id}",
              params: { item: { name: random_item_name } }.to_json,
              headers: headers
        first_item.reload
      end

      it 'makes changes to the item' do
        expect(first_item.name).to eq random_item_name
      end

      it 'returns status code 204' do
        expect(response).to have_http_status 204
      end
    end

    context 'when invalid params' do
      before do
        patch "/items/#{first_item_id}",
              params: { item: { name: '' } }.to_json,
              headers: headers
        first_item.reload
      end

      it "doesn't change the item" do
        expect(first_item.name).not_to eq ''
      end

      it 'returns an error message' do
        expect(json['message']).to match /Validation of Item failed./
      end

      it 'returns status code 422' do
        expect(response).to have_http_status 422
      end
    end
  end

  describe 'DELETE /items/:id' do
    context 'when item exists' do
      before { delete "/items/#{first_item_id}", headers: headers }

      it 'reduces the items count by one' do
        expect(Item.count).to eq 9
      end

      it 'returns status code 204' do
        expect(response).to have_http_status 204
      end
    end
    
    context "when item doesn't exist" do
      before { delete "/items/foobar", headers: headers }

      it "doesn't change the items count" do
        expect(Item.count).to eq 10
      end

      it "returns an error message" do
        expect(json['message']).to match /Document\(s\) not found/
      end

      it 'returns status code 404' do
        expect(response).to have_http_status 404
      end
    end
  end
end
