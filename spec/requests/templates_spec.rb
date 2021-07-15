require 'rails_helper'

RSpec.describe 'Templates API', type: :request do
  let!(:client) { create :client }
  let(:client_id) { client.id.to_s }
  let!(:templates) { create_populated_templates templates_count: 5 }
  let!(:random_template_name) { "Template_#{rand(200)}" }
  let(:template_ids) { templates.map { |t| t.id.to_s } }
  let(:first_template) { templates.first }
  let(:first_template_id) { first_template.id.to_s }

  describe 'GET /templates' do
    before { get '/templates' }

    it 'returns the list of templates' do
      expect(json.size).to eq(templates.size)
      expect(template_ids).to match_array json_ids
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe 'GET /templates/:id' do
    before { get "/templates/#{first_template_id}" }

    it 'returns the template' do
      expect(json_id).to eq(first_template_id)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe 'POST /templates' do
    before do
      post '/templates',
            params: { 
              template: {
                name: 'Example',
                save_name: 'EXAMPLE'
              },
              client_id: client_id
            }
    end

    it 'increases the templates count by one' do
      expect(Template.count).to eq 6
    end

    it 'returns status code 201' do
      expect(response).to have_http_status 201
    end
  end

  describe 'PATCH /templates/:id' do
    before do
      patch "/templates/#{first_template_id}",
            params: { template: { name: random_template_name } }
      first_template.reload
    end

    it 'makes changes to the template' do
      expect(first_template.name).to eq random_template_name
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end
  end

  describe 'DELETE /templates/:id' do
    before { delete "/templates/#{first_template_id}" }

    it 'reduces the templates count by one' do
      expect(Template.count).to eq 4
    end

    it 'returns status code 204' do
      expect(response).to have_http_status 204
    end
  end
end
