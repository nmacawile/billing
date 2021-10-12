FactoryBot.define do
  factory :periodic_billing do
    template

    start_date { Date.new(2021, 9, 01) }
    end_date { Date.new(2021, 9, 30) }
  end
end
