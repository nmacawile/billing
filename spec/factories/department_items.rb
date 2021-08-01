FactoryBot.define do
  factory :department_item do
    item
    department
    quantity { 2 }
    sequence(:position) { |n| n }
    deductions { [1, 2, 1, 1, 1, 1, 1] }
  end
end
