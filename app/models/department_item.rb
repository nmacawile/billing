class DepartmentItem
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :item
  embedded_in :department

  field :price, type: BigDecimal
  field :quantity, type: Integer
  field :position, type: Integer
  field :days, type: Array
  field :deductions, type: Array

  validates_presence_of :position
end
