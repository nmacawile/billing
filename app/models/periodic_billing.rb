class PeriodicBilling
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :template

  field :start_date, type: Date
  field :end_date, type: Date

  embeds_many :periods
end
