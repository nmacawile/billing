require 'rails_helper'

RSpec.describe Deduction, type: :model do
  let(:item) { create :item }
  let(:template) do
    create(:template) do |t|
      create(:department, template: t) do |d|
        create(:department_item, department: d, item: item) do |di|
          create(:deduction, department_item: di)
        end
      end
    end
  end

  subject(:deduction) do
    template.departments.first.department_items.first.deduction
  end

  it { is_expected.to be_valid }

  it { expect(subject.mon).to eq 2 }
  it { expect(subject.tue).to eq 3 }
  it { expect(subject.wed).to eq 4 }
  it { expect(subject.thu).to eq 5 }
  it { expect(subject.fri).to eq 6 }
  it { expect(subject.sat).to eq 7 }
  it { expect(subject.sun).to eq 8 }
end
