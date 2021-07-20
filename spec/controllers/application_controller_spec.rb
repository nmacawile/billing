require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  let(:user) { create :user }
  let(:headers) { authorized_request_headers(user.id) }
  
  describe '#authorize_request' do
    context 'when auth token is passed' do
      before do
        allow(request).to receive(:headers).and_return(headers)
      end
      
      it 'sets the current user' do
        expect(subject.instance_eval { authorize_request }).to eq user
      end
    end
    
    context 'when auth token is not passed' do
      before do
        allow(request).to receive(:headers).and_return(request_headers)
      end
      
      it 'raises MissingToken error' do
        expect { subject.instance_eval { authorize_request } }
          .to raise_error(ExceptionHandler::MissingToken, 'Missing token')
      end
    end
  end
end
