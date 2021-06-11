class Department
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :template

  field :name, type: String
end
