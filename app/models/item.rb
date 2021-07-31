class Item
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Enum

  field :name, type: String
  field :price, type: BigDecimal

  enum :item_type, [:broadsheet, :tabloid], default: :broadsheet

  validates_presence_of :name, :price
end
