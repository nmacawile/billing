FactoryBot.define do
  factory :periodic_billing do
    template
    sequence(:client_name) do |n|
      "#{Faker::Book.title} #{n}"
    end
    start_date { Date.new(2021, 9, 01) }
    end_date { Date.new(2021, 9, 30) }
  end
end
