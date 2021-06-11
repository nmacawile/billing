require 'rails_helper'

RSpec.describe Template, type: :model do
  subject { create :template }

  it { is_expected.to be_valid }
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of :save_name }
  it { is_expected.to belong_to :client }
  it { is_expected.to embed_many :departments }

  describe '#split' do
    it 'is set to true by default' do
      expect(subject.split).to eq(true) 
    end
  end
end
