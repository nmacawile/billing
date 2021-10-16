require 'rails_helper'

RSpec.describe "Periods Departments API", type: :request do  
  let(:user) { create :user }
  let(:headers) { authorized_request_headers(user.id) }
  let!(:billing) do
    create(:periodic_billing) do |b|
      create(:period, periodic_billing: b) do |p|
        create_list(:period_department, 5, period: p)
      end
    end
  end
  let(:period) { billing.periods.first }
  let(:departments) { period.period_departments }
  let(:department_params) do
    { 
      period_department: {
        name: 'New Dept'
      }
    }.to_json
  end
  let(:department) { departments.first }
  let(:billing_id) { billing.id.to_s }
  let(:period_id) { period.id.to_s }
  let(:department_ids) { departments.map { |d| d.id.to_s } }
  let(:department_id) { department.id.to_s }

  describe(
    "GET /periodic_billings/:billing_id" \
    "/periods/:period_id/period_departments") do
    before do
      get(
        "/periodic_billings/#{billing_id}" \
        "/periods/#{period_id}" \
        "/period_departments",
        headers: headers)
    end

    it 'returns the list of period departments' do
      expect(json.size).to eq(departments.count)
      expect(department_ids).to match_array json_ids
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe(
    "GET /periodic_billings/:billing_id" \
    "/periods/:period_id" \
    "/period_departments/:id") do
    before do
      get(
        "/periodic_billings/#{billing_id}" \
        "/periods/#{period_id}" \
        "/period_departments/#{department_id}",
        headers: headers)
    end

    it 'returns the department' do
      expect(json_id).to eq department_id
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe(
    "POST /periodic_billings/:billing_id" \
    "/periods/:period_id" \
    "/period_departments/:id") do
    before do
      post(
        "/periodic_billings/#{billing_id}" \
        "/periods/#{period_id}" \
        "/period_departments/",
        params: department_params,
        headers: headers)
      period.reload
    end

    it 'returns the id of the newly created department' do
      expect(department_ids).to include json['id']
    end

    it 'returns status code 201' do
      expect(response).to have_http_status 201
    end
  end

  describe(
    "PATCH /periodic_billings/:billing_id" \
    "/periods/:period_id" \
    "/period_departments/:id") do
    before do
      patch(
        "/periodic_billings/#{billing_id}" \
        "/periods/#{period_id}" \
        "/period_departments/#{department_id}",
        params: {
          period_department: { name: 'New Name' }
        }.to_json,
        headers: headers)
      department.reload
    end

    it 'makes changes to the department' do
      expect(department.name).to eq 'New Name'
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end
  end

  describe(
    "DELETE /periodic_billings/:billing_id" \
    "/periods/:period_id" \
    "/period_departments/:id") do
    before do
      delete(
        "/periodic_billings/#{billing_id}" \
        "/periods/#{period_id}" \
        "/period_departments/#{department_id}",
        headers: headers)
    end

    it 'reduces the period departments count by 1' do
      expect { period.reload }
        .to change { period.period_departments.count }.by -1
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end
  end
end
