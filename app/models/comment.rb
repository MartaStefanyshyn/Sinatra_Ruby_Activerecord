class Comment < ActiveRecord::Base
  acts_as_tree

  belongs_to :note, dependent: :destroy
  belongs_to :user, dependent: :destroy

  validates :content, :note_id, :user_id, presence: true

  def self.convert(comments, input_id)
    hash = comments.select{|comment| comment.parent_id == input_id}
    hash.map{|element| element.attributes.merge("children" => self.convert(comments, element[:id]))}
  end
end
