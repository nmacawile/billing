require 'rails_helper'

RSpec.describe Period, type: :model do
  subject { create :period }

  it { is_expected.to be_valid }
  it { is_expected.to be_embedded_in :periodic_billing }
  it { is_expected.to embed_many :period_departments }
end
