class Comment < ActiveRecord::Base
  acts_as_tree

  belongs_to :note
  belongs_to :user
end
