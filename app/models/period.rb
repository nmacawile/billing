class Period
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :periodic_billing
  embeds_many :period_departments

  field :start_date, type: DateTime
  field :end_date, type: DateTime
  field :days_off, type: Array
end
