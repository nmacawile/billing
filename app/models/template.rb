class Template
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Enum
  
  embeds_one :client
  embeds_many :departments

  field :name, type: String
  field :split, type: Boolean, default: true

  enum :paper_size, [:short, :long], default: :short

  validates_presence_of :name, :client
  validates_uniqueness_of :name

  index({ name: 1 }, { unique: true })
end
