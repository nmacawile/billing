FactoryBot.define do
  factory :department do
    template
    name { Faker::Game.title }
  end
end
