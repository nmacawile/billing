class DepartmentItem
  include Mongoid::Document

  belongs_to :item
  embedded_in :department

  field :price, type: BigDecimal
  field :quantity, type: Integer
  field :position, type: Integer
  field :days, type: Array,
               default: [
                 *Array.new(6) { true }, false
               ]

  field :deductions, type: Array
end
