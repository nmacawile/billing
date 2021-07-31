class Item
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Enum

  default_scope ->{ order(name: :asc) }

  field :name, type: String
  field :price, type: BigDecimal

  enum :item_type, [:broadsheet, :tabloid], default: :broadsheet

  validates_presence_of :name, :price
  validates_uniqueness_of :name

  index({ name: 1 }, { unique: true })
end
