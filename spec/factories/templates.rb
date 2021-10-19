FactoryBot.define do
  factory :template do
    client_name { Faker::Name.name }
    client_address { Faker::Address.street_name }
    name { Faker::Movie.title + rand(9999).to_s }
  end
end

def create_populated_templates(templates_count: 5, departments_count: 1, items_count: 3)
  create_list(
    :template,
    templates_count) do |template|
    create_list(
      :department,
      departments_count,
      template: template) do |department|
      create_list(
        :department_item,
        items_count,
        department: department)
    end
  end
end
