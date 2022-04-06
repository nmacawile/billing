class PeriodicBilling
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Enum

  belongs_to :template
  
  field :client_name, type: String
  field :client_address, type: String
  field :start_date, type: DateTime
  field :end_date, type: DateTime

  embeds_many :periods

  validates_presence_of :client_name,
                        :start_date,
                        :end_date

                        
  enum :format, [:short, :long], default: :short
end
