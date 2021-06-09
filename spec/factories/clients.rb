FactoryBot.define do
  factory :client do
    name { Faker::Name.name }
    address { Faker::Address.street_name }
  end
end
