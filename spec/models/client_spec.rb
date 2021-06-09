require 'rails_helper'

RSpec.describe Client, type: :model do
  subject { create(:client) }

  it { is_expected.to be_valid }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.not_to validate_presence_of(:address) }
end
