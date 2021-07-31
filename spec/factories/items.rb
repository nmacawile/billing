FactoryBot.define do
  factory :item do
    sequence(:name) do |n|
      "#{Faker::Book.title} #{n}"
    end
    price { 18 }
  end
end
