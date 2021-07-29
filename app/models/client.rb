class Client
  include Mongoid::Document

  embedded_in :template

  field :name, type: String
  field :address, type: String

  validates_presence_of :name
end
