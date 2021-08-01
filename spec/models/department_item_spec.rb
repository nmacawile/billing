require 'rails_helper'

RSpec.describe DepartmentItem, type: :model do
  subject { create :department_item }

  it { is_expected.to be_valid }
  it { is_expected.to belong_to(:item) }
  it { is_expected.to be_embedded_in :department }

  describe '#days' do
    it "is set to 'Mon-Sat' by default" do
      expect(subject.days).to eq([true, true, true, true, true, true, false])
    end
  end
end
