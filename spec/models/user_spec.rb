require 'spec_helper.rb'

RSpec.describe User, type: :model  do
  it { should have_many(:comments) }
  it { should have_many(:notes) }
  it "fails because password confirmation doesnt match" do
    user = User.create({:username => "test",
      :password => 'password',
      :password_confirmation => 'aa'})
    expect(user).to_not be_valid
  end

  it "succeeds because password & confirmation match" do
    user = User.create({:username => "test",
      :password => 'password',
      :password_confirmation => 'password'})
    expect(user).to be_valid
  end

end
