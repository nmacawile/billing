FactoryBot.define do
  factory :department_item do
    item
    department
    quantity { 2 }
    sequence(:position) { |n| n }
  end
end
