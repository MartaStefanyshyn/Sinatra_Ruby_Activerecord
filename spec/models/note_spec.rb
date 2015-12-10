require 'spec_helper.rb'

RSpec.describe Note, type: :model  do
  it { should belong_to(:user).dependent(:destroy)}
  it { should have_many(:comments) }

  it 'should create valid note' do
    note = Note.create(title: "title", body: "body")
    expect(note).to be_valid
  end

  it 'should not create note without title' do
    note = Note.create(body: "body")
    expect(note).to_not be_valid
  end

  it 'should not create note without body' do
    note = Note.create(body: "body")
    expect(note).to_not be_valid
  end

  it 'notelist is empty' do
    expect(Note.count).to eq 0
  end

  it "have empty array of comments" do
    note = Note.create()
    expect(note.comments).to eq []
  end

end
