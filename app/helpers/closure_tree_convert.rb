module ActsAsConvertable
  extend ActiveSupport::Concern
  module ClassMethods
    def acts_as_convertable(options = {})
      acts_as_tree
    end
    def convert(comments, input_id)
      hash = comments.select{|comment| comment.parent_id == input_id}
      hash.map{|element| element.attributes.merge("children" => convert(comments, element[:id]))}
    end
  end
end

ActiveRecord::Base.send :include, ActsAsConvertable

