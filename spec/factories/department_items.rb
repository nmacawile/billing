FactoryBot.define do
  factory :department_item do
    item
    department
    quantity { 2 }
    position { 0 }
    days { [true, true, true, true, true, true, true] }
    deductions { [1, 2, 1, 1, 1, 1, 1] }
  end
end
