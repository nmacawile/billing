FactoryBot.define do
  factory :period do
    periodic_billing
    days_off { 
      [Date.new(2021, 9, 11),
       Date.new(2021, 9, 12),
       Date.new(2021, 9, 13)]
    }
    start_date do
      Date.new(2021, 9, 1)
    end
    end_date do
      Date.new(2021, 9, 30)
    end
  end
end
