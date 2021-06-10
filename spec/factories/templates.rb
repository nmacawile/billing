FactoryBot.define do
  factory :template do
    client
    name { Faker::Movie.title }
    save_name { name }
  end
end
