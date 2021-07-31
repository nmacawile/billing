require 'rails_helper'

RSpec.describe Item, type: :model do
  subject { create(:item) }

  it { is_expected.to be_valid }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:price) }
  it { is_expected.to validate_uniqueness_of(:name) }
  it { is_expected.to have_index_for(name: 1).with_options(unique: true)}

  describe '#item_type' do
    it 'is set to :broadsheet by default' do
      expect(subject.item_type).to eq(:broadsheet)
    end
  end
end
