require 'csv'

def seed_items
  csv_text = File.read(Rails.root.join('lib', 'seeds', 'items.csv'))
  csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')

  csv.each do |_, (_, name), _, _, (_, item_type), (_, price)| 
    Item.create!(name: name, _item_type: item_type, price: price)
  end
end

if (Rails.env.development?)
  User.create!(email: 'user@email.com', password: '111111')
  seed_items
end
