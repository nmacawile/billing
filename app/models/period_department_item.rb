class PeriodDepartmentItem
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :period_department

  field :name, type: String
  field :price, type: BigDecimal
  field :quantity, type: BigDecimal

  field :total_copies, type: BigDecimal
  field :total_deductions, type: BigDecimal

  field :days, type: String

  field :days_off, type: Array
end
