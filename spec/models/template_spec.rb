require 'rails_helper'

RSpec.describe Template, type: :model do
  subject { create :template }

  it { is_expected.to be_valid }
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of(:client_name) }
  it { is_expected.not_to validate_presence_of(:client_address) }
  it { is_expected.to embed_many :departments }

  it { is_expected.to validate_uniqueness_of :name }
  it { is_expected.to have_index_for(name: 1).with_options(unique: true) }
end
