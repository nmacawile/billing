class Department
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :template
  embeds_many :department_items
  
  field :name, type: String
end
