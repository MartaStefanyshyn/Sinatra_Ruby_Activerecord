class Comment < ActiveRecord::Base
  acts_as_convertable

  belongs_to :note, dependent: :destroy
  belongs_to :user, dependent: :destroy

  validates :content, :note_id, presence: true
end
