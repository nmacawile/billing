class Client
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :templates

  field :name, type: String
  field :address, type: String

  validates_presence_of :name
end
