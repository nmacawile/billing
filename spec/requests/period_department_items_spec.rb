require 'rails_helper'

RSpec.describe "Periods Department Items API", type: :request do  
  let(:user) { create :user }
  let(:headers) { authorized_request_headers(user.id) }
  let!(:billing) do
    create(:periodic_billing) do |b|
      create(:period, periodic_billing: b) do |p|
        create(:period_department, period: p) do |d|
          create_list(:period_department_item, 5, period_department: d)
        end
      end
    end
  end
  let(:period) { billing.periods.first }
  let(:department) { period.period_departments.first }
  let(:department_items) { department.period_department_items }
  let(:department_item) { department_items.first }
  let(:department_item_ids) { department_items.map { |i| i.id.to_s } }
  let(:billing_id) { billing.id.to_s }
  let(:period_id) { period.id.to_s }
  let(:department_id) { department.id.to_s }
  let(:department_item_id) { department_item.id.to_s }
  let(:department_item_params) do
    { 
      period_department_item: {
        name: 'Test',
        price: 12,
        quantity: 1,
        total_copies: 29,
        total_deductions: 1,
        days: 'Mon-Sun',
        days_off: [
          { date: Date.new(2021, 9, 5),
            amount: 1 }
        ]
      }
    }.to_json
  end
  
  describe(
    "GET /periodic_billings/:billing_id" \
    "/periods/:period_id" \
    "/period_departments/:department_id" \
    "/period_department_items") do
    before do
      get(
        "/periodic_billings/#{billing_id}" \
        "/periods/#{period_id}" \
        "/period_departments/#{department_id}" \
        "/period_department_items",
        headers: headers)
    end

    it 'returns the list of period department items' do
      expect(json.size).to eq(department_items.count)
      expect(department_item_ids).to match_array json_ids
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe(
    "GET /periodic_billings/:billing_id" \
    "/periods/:period_id" \
    "/period_departments/:department_id" \
    "/period_department_items/:id") do
    before do
      get(
        "/periodic_billings/#{billing_id}" \
        "/periods/#{period_id}" \
        "/period_departments/#{department_id}" \
        "/period_department_items/#{department_item_id}",
        headers: headers)
    end

    it 'returns the period department item' do
      expect(department_item_id).to eq json_id
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe(
    "DELETE /periodic_billings/:billing_id" \
    "/periods/:period_id" \
    "/period_departments/:department_id" \
    "/period_department_items/:id") do
    before do
      delete(
        "/periodic_billings/#{billing_id}" \
        "/periods/#{period_id}" \
        "/period_departments/#{department_id}" \
        "/period_department_items/#{department_item_id}",
        headers: headers)
    end

    it 'reduces period department item count by 1' do
      expect { department.reload }
        .to(
          change { department.period_department_items.count }
            .by(-1)
        )
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end
  end

  describe(
    "POST /periodic_billings/:billing_id" \
    "/periods/:period_id" \
    "/period_departments/:department_id" \
    "/period_department_items") do
    before do
      post(
        "/periodic_billings/#{billing_id}" \
        "/periods/#{period_id}" \
        "/period_departments/#{department_id}" \
        "/period_department_items",
        params: department_item_params,
        headers: headers)
    end

    it 'increases period department item count by 1' do
      expect { department.reload }
        .to(
          change { department.period_department_items.count }
            .by(1)
        )
    end

    it 'returns the id of the newly created department item' do
      department.reload
      expect(department_item_ids).to include json['id']
    end

    it 'returns status code 201' do
      expect(response).to have_http_status 201
    end
  end

  describe(
    "PATCH /periodic_billings/:billing_id" \
    "/periods/:period_id" \
    "/period_departments/:department_id" \
    "/period_department_items/:id") do
    before do
      patch(
        "/periodic_billings/#{billing_id}" \
        "/periods/#{period_id}" \
        "/period_departments/#{department_id}" \
        "/period_department_items/#{department_item_id}",
        params: {
          period_department_item: {
            name: 'FOOBAR'
          }
        }.to_json,
        headers: headers)
      department_item.reload
    end

    it 'makes changes to the department item' do
      expect(department_item.name).to eq 'FOOBAR'
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end
  end
end
