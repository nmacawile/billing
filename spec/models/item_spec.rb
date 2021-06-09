require 'rails_helper'

RSpec.describe Item, type: :model do
  subject { create(:item) }

  it { is_expected.to be_valid }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:price) }
  it { is_expected.to validate_presence_of(:type) }
  it { is_expected.not_to validate_presence_of(:sunday_price) }

  describe '#type' do
    it 'is set to :broadsheet by default' do
      expect(subject.type).to eq(:broadsheet)
    end
  end
end
