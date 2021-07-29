FactoryBot.define do
  factory :template do
    client { build :client }
    name { Faker::Movie.title }
    save_name { name }
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
