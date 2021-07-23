require 'rails_helper'

RSpec.describe User, type: :model do
  it { is_expected.to validate_uniqueness_of :email }
  it do
    is_expected
      .to have_index_for(email: 1)
      .with_options(unique: true)
  end
end
