class User < ActiveRecord::Base
  has_secure_password
  has_many :comments
  has_many :notes
  validates :username, presence: true
  validates_confirmation_of :password
end

