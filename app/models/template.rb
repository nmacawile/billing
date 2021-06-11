class Template
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Enum
  
  belongs_to :client
  embeds_many :departments

  field :name, type: String
  field :save_name, type: String
  field :split, type: Boolean, default: true

  enum :paper_size, [:short, :long], default: :short

  validates_presence_of :name, :save_name
end
