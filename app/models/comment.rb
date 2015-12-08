class Comment < ActiveRecord::Base
  acts_as_tree

  belongs_to :note
  belongs_to :user

  def self.convert(comments, input_id)
    result = []

    query_results = comments.select(:id, :content, :note_id, :parent_id).where(parent_id: input_id)
    query_results.each do |element|
      result.push({'id'=>element[:id],'content'=>element[:content],'note_id'=>element[:note_id],'parent_id'=>element[:parent_id],'subcomment'=>self.convert(comments, element[:id])})
    end

    return result

  end

end
