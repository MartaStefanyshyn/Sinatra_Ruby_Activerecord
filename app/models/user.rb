class User < ActiveRecord::Base
  has_secure_password
  has_many :comments
  has_many :notes
  validates :username, presence: true
  validates_confirmation_of :password
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    if self.role == nil
      self.role = "user"
    end
  end
end

