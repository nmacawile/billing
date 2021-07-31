require 'rails_helper'

RSpec.describe Template, type: :model do
  subject { create :template }

  it { is_expected.to be_valid }
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of :client }
  it { is_expected.to embed_one :client }
  it { is_expected.to embed_many :departments }

  it { is_expected.to validate_uniqueness_of :name }
  it { is_expected.to have_index_for(name: 1).with_options(unique: true) }

  describe '#split' do
    it 'is set to true by default' do
      expect(subject.split).to eq(true) 
    end
  end
end
