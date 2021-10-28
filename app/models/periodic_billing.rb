class PeriodicBilling
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :template
  
  field :client_name, type: String
  field :client_address, type: String
  field :start_date, type: Date
  field :end_date, type: Date

  embeds_many :periods

  validates_presence_of :client_name,
                        :start_date,
                        :end_date
end
