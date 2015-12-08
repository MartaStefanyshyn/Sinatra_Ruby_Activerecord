class Comment < ActiveRecord::Base
  acts_as_tree

  belongs_to :note
  belongs_to :user

  def self.convert(input_id)
    @comment = self.all
    result = []

    query_results = @comment.select(:id, :content, :note_id, :parent_id).where(parent_id: input_id)
    query_results.each do |element|
      result.push({'id'=>element[:id],'content'=>element[:content],'note_id'=>element[:note_id],'parent_id'=>element[:parent_id],'subcomment'=>self.convert(element[:id])})
    end

    return result

  end

end
