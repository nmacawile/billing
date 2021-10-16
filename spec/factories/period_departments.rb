FactoryBot.define do
  factory :period_department do
    period
    name { Faker::Creature::Animal.name + rand(999).to_s }
  end
end
