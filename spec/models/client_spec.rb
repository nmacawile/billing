require 'rails_helper'

RSpec.describe Client, type: :model do
  let(:template) { create :template }
  subject { template.client }

  it { is_expected.to be_valid }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.not_to validate_presence_of(:address) }

  it { is_expected.to be_embedded_in(:template) }
end
