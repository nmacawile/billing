require 'rails_helper'

RSpec.describe 'Periodic Billings API', type: :request do
  let(:user) { create :user }
  let(:headers) { authorized_request_headers(user.id)}
  let!(:billings) { create_list :periodic_billing, 10 }
  let(:billing_ids) { PeriodicBilling.all.map { |t| t.id.to_s } }
  let(:billing_count) { PeriodicBilling.count }
  let(:first_billing) { billings.first }
  let(:first_billing_id) { first_billing.id.to_s }
  let(:template) { create :template }
  let(:billing_params) do
    { start_date: Date.new(2021, 9, 1),
      client_name: Faker::Name.name,
      client_address: '',
      end_date: Date.new(2021, 9, 30),
      template: template.id.to_s }
  end

  describe 'GET /periodic_billings' do
    context 'single page' do
      before { get '/periodic_billings', headers: headers }

      it 'returns the list of billings' do
        expect(json['billings'].size).to eq(billings.size)
        expect(billing_ids).to match_array paginated_json_ids
      end

      it 'returns status code 200' do
        expect(response).to have_http_status 200
      end
    end

    context 'multiple pages' do
      before { create_list :periodic_billing, 45 }

      context 'first page' do
        before { get '/periodic_billings', headers: headers }

        it 'returns total number of pages' do
          expect(json['pages']).to eq 3
        end

        it 'limits the results to 20 items' do
          expect(json['billings'].size).to eq 20
        end

        it 'returns the list of billings' do
          expect(billing_ids.first 20).to match_array paginated_json_ids
        end
      end

      context 'last page' do
        before do
          get '/periodic_billings', headers: headers, params: { page: 3 }
        end

        it 'returns total number of pages' do
          expect(json['pages']).to eq 3
        end

        it 'limits the results to 20 items' do
          expect(json['billings'].size).to eq 15
        end

        it 'returns the list of billings' do
          expect(billing_ids[40..]).to match_array paginated_json_ids
        end

      end
    end
  end

  describe 'GET /periodic_billings/:id' do
    before do
      get "/periodic_billings/#{first_billing_id}", headers: headers
    end

    it 'returns the first billing' do
      expect(first_billing_id).to eq json_id
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe 'POST /periodic_billings' do
    before do
      post "/periodic_billings",
           params: { periodic_billing: billing_params }.to_json,
           headers: headers
    end

    it 'returns status code 201' do
      expect(response).to have_http_status 201
    end

    it 'returns the id of the newly created billing' do
      expect(billing_ids).to include(json['id'])
    end

    it 'creates a new billing' do
      expect(billing_count).to eq 11
    end
  end

  describe 'DELETE /periodic_billings/:id' do
    before do
      delete "/periodic_billings/#{first_billing_id}",
             headers: headers
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end

    it 'deletes the billing' do
      expect(billing_count).to eq 9
    end
  end

  describe 'PATCH /periodic_billings/:id' do
    before do
      patch "/periodic_billings/#{first_billing_id}",
           params: { 
             periodic_billing: 
               { start_date: Date.new(2021, 8, 1) }
           }.to_json,
           headers: headers
      first_billing.reload
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end

    it 'makes changes to the billing' do
      expect(first_billing.start_date).to eq Date.new(2021, 8, 1)
    end
  end
end
