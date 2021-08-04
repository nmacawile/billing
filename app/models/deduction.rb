class Deduction
  include Mongoid::Document
  embedded_in :department_item

  field :mon, type: Integer
  field :tue, type: Integer
  field :wed, type: Integer
  field :thu, type: Integer
  field :fri, type: Integer
  field :sat, type: Integer
  field :sun, type: Integer
end
