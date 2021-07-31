require 'rails_helper'

RSpec.describe 'Templates API', type: :request do
  let(:user) { create :user }
  let(:headers) { authorized_request_headers(user.id) }
  let!(:templates) { create_populated_templates templates_count: 5 }
  let!(:random_template_name) { "Template_#{rand(200)}" }
  let(:template_ids) { templates.map { |t| t.id.to_s } }
  let(:first_template) { templates.first }
  let(:first_template_id) { first_template.id.to_s }

  describe 'GET /templates' do
    before { get '/templates', headers: headers }

    it 'returns the list of templates' do
      expect(json.size).to eq(templates.size)
      expect(template_ids).to match_array json_ids
    end

    it 'returns status code 200' do
      expect(response).to have_http_status 200
    end
  end

  describe 'GET /templates/:id' do
    context 'when template exists' do
      before { get "/templates/#{first_template_id}", headers: headers }

      it 'returns the template' do
        expect(json_id).to eq(first_template_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status 200
      end
    end

    context "when template doesn't exist" do
      before { get "/templates/foobar", headers: headers }

      it "returns an error message" do
        expect(json['message']).to match /Document\(s\) not found/
      end

      it 'returns status code 404' do
        expect(response).to have_http_status 404
      end
    end
  end

  describe 'POST /templates' do
    context 'when valid params' do
      before do
        post '/templates',
              params: { 
                template: {
                  name: 'Example',
                  client: {
                    name: 'example client',
                    address: 'example address'
                  }
                },
              }.to_json,
              headers: headers
      end

      it 'increases the templates count by one' do
        expect(Template.count).to eq 6
      end

      it 'returns status code 201' do
        expect(response).to have_http_status 201
      end      
    end

    context 'when invalid params' do
      before do
        post '/templates',
              params: { template: { name: '' } }.to_json,
              headers: headers
      end

      it 'returns an error message' do
        expect(json['message']).to match /Validation of Template failed./
      end

      it 'returns status code 422' do
        expect(response).to have_http_status 422
      end      
    end
  end

  describe 'PATCH /templates/:id' do
    context 'when valid params' do
      before do
        patch "/templates/#{first_template_id}",
              params: { template: { name: random_template_name } }.to_json,
              headers: headers
        first_template.reload
      end

      it 'makes changes to the template' do
        expect(first_template.name).to eq random_template_name
      end

      it 'returns status code 204' do
        expect(response).to have_http_status 204
      end
    end

    context 'when invalid params' do
      before do
        patch "/templates/#{first_template_id}",
              params: { template: { name: '' } }.to_json,
              headers: headers
        first_template.reload
      end

      it "doesn't change the template" do
        expect(first_template.name).not_to eq ''
      end

      it 'returns an error message' do
        expect(json['message']).to match /Validation of Template failed./
      end

      it 'returns status code 422' do
        expect(response).to have_http_status 422
      end
    end
  end

  describe 'DELETE /templates/:id' do
    context 'when template exists' do
      before { delete "/templates/#{first_template_id}", headers: headers }

      it 'reduces the templates count by one' do
        expect(Template.count).to eq 4
      end

      it 'returns status code 204' do
        expect(response).to have_http_status 204
      end
    end
    
    context "when template doesn't exist" do
      before { delete "/templates/foobar", headers: headers }

      it "doesn't change the templates count" do
        expect(Template.count).to eq 5
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
