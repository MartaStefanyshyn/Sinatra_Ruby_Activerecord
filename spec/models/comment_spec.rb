require 'spec_helper.rb'

RSpec.describe Comment, type: :model  do
  it { should belong_to(:note) }
  it { should belong_to(:user) }
  it { is_expected.to be_a_closure_tree }
  it 'should create valid comment' do
    comment = Comment.create(content: "content", note_id: 1, user_id: 1)
    expect(comment).to be_valid
  end

  it 'should not create comment without content' do
    comment = Comment.create(note_id: 1, user_id: 1)
    expect(comment).to_not be_valid
  end

  it 'should not create comment without note_id' do
    comment = Comment.create(content: "content", user_id: 1)
    expect(comment).to_not be_valid
  end

  it 'has empty commentlist' do
    expect(Comment.count).to eq 0
  end

  it "has note" do
    comment = Comment.create(content: "content", note_id: 1, user_id: 1)
    note = Note.create(id: 1, title: "title", body: "body")
    expect(comment.note).to eq note
  end

  it "execute convert method" do
    comments = []
    comment1 = Comment.create(id: 1, content: "content", note_id: 1, user_id: 1, parent_id: 0)
    comment2 = Comment.create(id: 2, content: "content", note_id: 1, user_id: 1, parent_id: 1)
    comments.push(comment1, comment2)
    result = Comment.convert(comments, 0)

    expect(result).to eq [comment1.attributes.merge("children" => [comment2.attributes.merge("children" =>[])])]
  end

  it "has note" do
    comment = Comment.create(id: 1, content: "content", note_id: 1, user_id: 1, parent_id: 0)
    result = Comment.convert([comment], 0)

    expect(result).to eq [comment.attributes.merge("children" => [])]
  end

  it "execute convert method" do
    comment = Comment.create(id: 1, content: "content", note_id: 1, user_id: 1, parent_id: 0)
    Comment.class_eval do
      class << self
        alias_method :convert_, :convert
      end
    end
    expect(Comment).to receive(:convert).with([comment], 1).ordered.and_call_original
    Comment.convert_([comment], 0)
  end

end
