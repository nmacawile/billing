require 'rails_helper'

RSpec.describe "DepartmentItems", type: :request do
  let(:user) { create :user }
  let(:headers) { authorized_request_headers(user.id) }
  let(:templates) do 
    create_populated_templates(
      templates_count: 1,
      departments_count: 1,
      items_count: 3
    )
  end
  let(:template) { templates.first }
  let(:department) { template.departments.first }
  let(:department_items) { department.department_items }
  let(:department_item_ids) { department_items.map { |di| di.id.to_s } }
  let(:department_item) { department_items.first }
  let(:department_item_id) { department_item.id.to_s }
  let(:item) { create :item }
  let(:new_item) { create(:item, name: "Item \##{rand(100)}") }
  let(:new_item_id) { new_item.id.to_s }
  let(:department_item_params) do |variable|
    { **attributes_for(:department_item), position: 0, item: item.id.to_s }
  end

  describe(
    'GET /templates/:template_id/departments/:department_id/department_items'
  ) do

    before do
      get "/templates/#{template.id}/departments/#{department.id}/department_items",
          headers: headers
    end

    it 'returns all department items' do
      expect(department_item_ids).to eq json_ids
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe(
    'GET /templates/:template_id/departments/:department_id/department_items/:id'
  ) do

    before do
      get(
        "/templates/#{template.id}" \
        "/departments/#{department.id}" \
        "/department_items/#{department_item_id}",
        headers: headers
      )
    end

    it 'returns the department item' do
      expect(department_item_id).to eq json_id
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe(
    'POST /templates/:template_id/departments/:department_id/department_items'
  ) do

    before do
      post(
        "/templates/#{template.id}" \
        "/departments/#{department.id}" \
        "/department_items",
        params: { 
          department_item: department_item_params
        }.to_json,
        headers: headers
      )
      department.reload
    end

    it 'creates the department item' do
      expect(department_items.count).to eq 4
    end

    it 'returns the id of the newly created item' do
      expect(department_item_ids).to include(json['id'])
    end

    it 'returns status code 201' do
      expect(response).to have_http_status 201
    end
  end

  describe(
    "PATCH /templates" \
    "/:template_id" \
    "/departments/:department_id" \
    "/department_items/:id"
  ) do

    before do
      patch(
        "/templates/#{template.id}" \
        "/departments/#{department.id}" \
        "/department_items/#{department_item_id}",
        params: {
          department_item: {
            item: new_item_id
          }
        }.to_json,
        headers: headers
      )
      department_item.reload
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end

    it 'makes changes to the department item' do
      expect(department_item.item.name).to eq new_item.name
    end
  end

  describe(
    "DELETE /templates" \
    "/:template_id" \
    "/departments/:department_id" \
    "/department_items/:id"
  ) do

    before do
      delete(
        "/templates/#{template.id}" \
        "/departments/#{department.id}" \
        "/department_items/#{department_item_id}",
        headers: headers
      )
      department.reload
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end

    it 'deletes the department item' do
      expect(department.department_items.count).to eq 2
    end
  end
end
