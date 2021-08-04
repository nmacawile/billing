class DepartmentItem
  include Mongoid::Document

  belongs_to :item
  embedded_in :department
  embeds_one :deduction

  field :price, type: BigDecimal
  field :quantity, type: Integer
  field :position, type: Integer
  field :days, type: String, default: 'Mon-Fri'
end
