class Client
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :address, type: String

  validates_presence_of :name
end
