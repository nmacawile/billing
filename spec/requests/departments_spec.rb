require 'rails_helper'

RSpec.describe 'Departments', type: :request do
  let(:user) { create :user }
  let(:headers) { authorized_request_headers(user.id) }
  let(:templates) do 
    create_populated_templates(
      templates_count: 1,
      departments_count: 3,
      items_count: 3
    )
  end
  let(:template) { templates.first }
  let(:departments) { template.departments }
  let(:department_ids) { departments.map { |d| d.id.to_s } }
  let(:department) { departments.first }
  let(:department_id) { department.id.to_s }

  describe 'GET /templates/:template_id/departments' do
    before do
      get "/templates/#{template.id}/departments",
          headers: headers
    end

    it 'returns all departments' do
      expect(department_ids).to eq json_ids
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe 'POST /templates/:template_id/departments' do
    before do
      post "/templates/#{template.id}/departments",
           params: { department: { name: 'New Department' } }.to_json,
           headers: headers
      template.reload
    end

    it 'returns status code 201' do
      expect(response).to have_http_status 201
    end

    it 'creates a new department' do
      expect(template.departments.count).to eq 4
    end
  end

  describe 'GET /templates/:template_id/departments/:id' do
    before do
      get "/templates/#{template.id}/departments/#{department_id}",
          headers: headers
    end

    it 'returns the department' do
      expect(json_id).to eq department_id
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe 'PATCH /templates/:template_id/departments/:id' do
    before do
      patch "/templates/#{template.id}/departments/#{department_id}",
            params: { department: { name: 'New Department Name' } }.to_json,
            headers: headers
      department.reload
    end

    context 'when department exists' do
      it 'makes changes to the department' do
        expect(department.name).to eq 'New Department Name'
      end

      it 'returns status code 204' do
        expect(response).to have_http_status 204
      end
    end

    context 'when department doesn\'t exist' do
      let(:department_id) { 'x' }

      it 'doesn\'t make changes to the department' do
        expect(department.name).not_to eq 'New Department Name'
      end

      it 'returns status code 404' do
        expect(response).to have_http_status 404
      end
    end
  end

  describe 'DELETE /templates/:template_id/departments/:id' do
    before do
      delete "/templates/#{template.id}/departments/#{department_id}",
             headers: headers
      template.reload
    end

    context 'when department exists' do
      it 'deletes the department' do
        departments_count = template.departments.count
        expect(departments_count).to eq 2
      end

      it 'returns status code 204' do
        expect(response).to have_http_status 204
      end
    end

    context 'when department doesn\'t exist' do
      let(:department_id) { 'x' }

      it 'returns status code 404' do
        expect(response).to have_http_status 404
      end
    end
  end
end
