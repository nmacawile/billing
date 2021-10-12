require 'rails_helper'

RSpec.describe PeriodicBilling, type: :model do
  subject { create :periodic_billing }

  it { is_expected.to be_valid }
  it { is_expected.to belong_to :template }
  it { is_expected.to embed_many :periods }
end
