require 'rails_helper'

RSpec.describe Department, type: :model do
  subject { create :department }

  it { is_expected.to be_valid }
  it { is_expected.to be_embedded_in(:template) }
  it { is_expected.not_to validate_presence_of :name }
  it { is_expected.to embed_many :department_items }
end
