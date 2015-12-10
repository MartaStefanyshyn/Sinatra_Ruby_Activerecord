class Note < ActiveRecord::Base
  has_many :comments
  belongs_to :user, dependent: :destroy
  validates :title, :body, presence: true
end
