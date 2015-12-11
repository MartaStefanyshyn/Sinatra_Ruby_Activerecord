module ActiveRecord
  class Base
    def self.convert(comments, input_id)
      hash = comments.select{|comment| comment.parent_id == input_id}
      return hash.map{|element| element.attributes.merge("children" => self.convert(comments, element[:id]))}
    end
  end
end
