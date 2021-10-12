FactoryBot.define do
  factory :period_department_item do
    period_department
    name { Faker::JapaneseMedia::DragonBall.character }
    days { 'Mon-Sun' }
    price { 20 }
    quantity { 2 }
    total_copies { 58 }
    total_deductions { 2 }
    days_off {
      [{ date: Date.new(2021, 9, 2), amount: 2 }]
    }
  end
end
