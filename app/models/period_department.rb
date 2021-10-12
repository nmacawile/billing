class PeriodDepartment
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :period
  embeds_many :period_department_items

  field :name, type: String
end
