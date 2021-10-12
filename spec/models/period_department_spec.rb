require 'rails_helper'

RSpec.describe PeriodDepartment, type: :model do
  subject { create :period_department }

  it { is_expected.to be_valid }
  it { is_expected.to be_embedded_in :period }
  it { is_expected.to embed_many :period_department_items }
end
