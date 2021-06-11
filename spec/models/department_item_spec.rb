require 'rails_helper'

RSpec.describe DepartmentItem, type: :model do
  subject { create :department_item }

  it { is_expected.to be_valid }
  it { is_expected.to belong_to :item }
  it { is_expected.to be_embedded_in :department }
  it { is_expected.to validate_presence_of :position }
end
