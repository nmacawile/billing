class DepartmentItem
  include Mongoid::Document

  belongs_to :item
  embedded_in :department

  field :price, type: BigDecimal
  field :quantity, type: Integer
  field :position, type: Integer
  field :days, type: String, default: 'Mon-Fri'
  field :deduction, type: Hash, default: {}

  validates_presence_of :item
end
