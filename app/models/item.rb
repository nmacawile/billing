class Item
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Enum

  field :name, type: String
  field :price, type: BigDecimal
  field :sunday_price, type: BigDecimal

  enum :type, [:broadsheet, :tabloid], default: :broadsheet

  validates_presence_of :name, :price, :type
end
