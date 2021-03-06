class PeriodicBilling
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Enum

  belongs_to :template, optional: true
  
  field :client_name, type: String
  field :client_address, type: String
  field :start_date, type: DateTime
  field :end_date, type: DateTime
  field :discount, type: BigDecimal
  field :total, type: BigDecimal

  embeds_many :periods

  validates_presence_of :client_name,
                        :start_date,
                        :end_date

                        
  enum :format, [:short,
                 :long,
                 :legacy,
                 :ncmf,
                 :bir,
                 :orlaza], default: :short

  default_scope { order_by(created_at: :desc) }

  index(created_at: -1, client_name: 1)
end
