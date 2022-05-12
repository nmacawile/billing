require 'rails_helper'

RSpec.describe PeriodicBilling, type: :model do
  subject { create :periodic_billing }

  it { is_expected.to be_valid }
  it { is_expected.to belong_to(:template).with_optional }
  it { is_expected.to embed_many :periods }
  it { is_expected.to validate_presence_of :client_name }
  it { is_expected.not_to validate_presence_of :client_address }
  it { is_expected.to validate_presence_of :start_date }
  it { is_expected.to validate_presence_of :end_date }
end
