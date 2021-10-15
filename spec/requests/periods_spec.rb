require 'rails_helper'

RSpec.describe "Periods API", type: :request do  
  let(:user) { create :user }
  let(:headers) { authorized_request_headers(user.id) }
  let(:billing) { create :periodic_billing }
  let(:billing_id) { billing.id.to_s }
  let!(:periods) do
    create_list(:period, 10,
                periodic_billing: billing)
  end
  let(:period_ids) do
    billing.periods.map { |p| p.id.to_s }
  end
  let(:period) { billing.periods.first }
  let(:period_id) { period.id.to_s }
  let(:period_count) { billing.periods.count }
  let(:period_params) do 
    { period: {
        start_date: Date.new(2021, 10, 1), 
        end_date: Date.new(2021, 10, 31),
        days_off: [Date.new(2021, 10, 3), 
                   Date.new(2021, 10, 4)] }
    }.to_json
  end

  describe("GET " \
           "/periodic_billings/:periodic_billing_id" \
           "/periods") do

    before do
      get("/periodic_billings" \
          "/#{billing_id}" \
          "/periods",
          headers: headers)
    end

    it 'returns the list of periods' do
      expect(json.size).to eq(periods.size)
      expect(period_ids).to match_array json_ids
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe("GET " \
           "/periodic_billings/:periodic_billing_id" \
           "/periods/:id") do

    before do
      get("/periodic_billings" \
          "/#{billing_id}" \
          "/periods/#{period_id}",
          headers: headers)
    end

    it 'returns the list of period' do
      expect(period_id).to eq json_id
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe("DELETE " \
           "/periodic_billings/:periodic_billing_id" \
           "/periods/:id") do

    before do
      delete("/periodic_billings" \
             "/#{billing_id}" \
             "/periods/#{period_id}",
             headers: headers)
      billing.reload
    end

    it 'reduces the period count by 1' do
      expect(period_count).to eq 9
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end
  end

  describe("POST " \
           "/periodic_billings/:periodic_billing_id" \
           "/periods") do

    before do
      post("/periodic_billings" \
           "/#{billing_id}" \
           "/periods",
           params: period_params,
           headers: headers)
      billing.reload
    end

    it 'returns the id of the newly created period' do
      expect(period_ids).to include(json['id'])
    end

    it 'returns status code 201' do
      expect(response).to have_http_status 201
    end
  end

  describe("PATCH " \
           "/periodic_billings/:periodic_billing_id" \
           "/periods/:id") do

    before do
      patch("/periodic_billings" \
            "/#{billing_id}" \
            "/periods/#{period_id}",
            params: { start_date: Date.new(2021, 1, 1) }.to_json,
            headers: headers)
      period.reload
    end

    it 'makes changes to the period' do
      expect(period.start_date).to eq Date.new(2021, 1, 1)
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end
  end
end
