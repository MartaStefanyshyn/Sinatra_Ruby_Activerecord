class Comment < ActiveRecord::Base
  acts_as_tree

  belongs_to :note
  belongs_to :user

  def self.convert(comments, input_id)
    result = []

    hash = comments.select{|comment| comment.parent_id == input_id}
    hash.map{|element| result.push(element.attributes.merge("subcomment" => self.convert(comments, element[:id])))}
    return result
  end

end
