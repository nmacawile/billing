FactoryBot.define do
  factory :item do
    name { Faker::Book.title }
    price { 18 }
  end
end
