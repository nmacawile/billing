require 'rails_helper'

RSpec.describe PeriodDepartmentItem, type: :model do
  subject { create :period_department_item }

  it { is_expected.to be_valid }
  it { is_expected.to be_embedded_in :period_department }
end
