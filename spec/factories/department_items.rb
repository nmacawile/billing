FactoryBot.define do
  factory :department_item do
    item
    department
    quantity { 2 }
    sequence(:position) { |n| n }
    days { 'Mon-Sat' }
    deduction do
      {
        0 => 1,
        1 => 1,
        2 => 1,
        3 => 1,
        4 => 1,
        5 => 1,
        6 => 1
      }
    end
  end
end
