module ClosureTree
  module HashTree
    module ClassMethods
      def convert(comments, input_id)
        hash = comments.select{|comment| comment.parent_id == input_id}
        hash.map{|element| element.attributes.merge("children" => convert(comments, element[:id]))}
      end
    end
  end
end

