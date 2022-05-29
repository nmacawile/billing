class Template
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Enum
  
  embeds_many :departments

  field :name, type: String
  field :client_name, type: String
  field :client_address, type: String

  enum :format, [:short,
                 :long,
                 :legacy,
                 :ncmf,
                 :bir,
                 :orlaza], default: :short

  validates_presence_of :name, :client_name
  validates_uniqueness_of :name

  index({ name: 1 }, { unique: true })
end
