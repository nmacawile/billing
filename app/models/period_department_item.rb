class PeriodDepartmentItem
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :period_department

  field :name, type: String
  field :price, type: BigDecimal
  field :quantity, type: Integer

  field :total_copies, type: Integer
  field :total_deductions, type: Integer
  field :amount, type: BigDecimal

  field :days, type: String

  field :days_off, type: Array
end
