FactoryBot.define do
  factory :period_department do
    period
    name { Faker::Creature::Animal.name }
  end
end
