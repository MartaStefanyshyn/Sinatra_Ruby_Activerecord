get "/comments" do
  @comments = Comment.all
  redirect "/comments/new" if @comments.empty?
  erb :'comments/index'
end

get "/note/:id/comments/new" do
  @note = Note.find(params[:id])
  erb :'comments/new'
end

post "/note/:id/comments/new" do
  @note = Note.find(params[:id])
  @comment = Comment.new(params[:comment])
  if @comment.save
    redirect "/note/#{@note.id}"
  else
    erb :'comments/new'
  end
end

get "/note/:note_id/comments/comment/:id" do
  @note = Note.find(params[:note_id])
  @comment = Comment.find_by_id(params[:id])
  erb :'comments/show'
end

get "/note/:note_id/comments/comment/:id/edit" do
  @note = Note.find(params[:note_id])
  @comment = Comment.find_by_id(params[:id])
  erb :'comments/edit'
end

post "/note/:note_id/comments/comment/:id" do
  @note = Note.find(params[:note_id])
  @comment = Comment.find(params[:id])
  if @comment.update_attributes(params[:comment])
    redirect to("/note/#{@note.id}")
  else
    erb :'comments/edit'
  end
end

get "/note/:note_id/comments/comment/:id/destroy" do
  @note = Note.find(params[:note_id])
  @comment = Comment.find_by_id(params[:id])
  erb :'comments/delete'
end

post "/note/:note_id/comments/comment/:id/destroy" do
  @note = Note.find(params[:note_id])
  if params.has_key?("ok")
    @comment = Comment.find_by_id(params[:id])
    @comment.destroy
    redirect to("/note/#{@note.id}")
  else
    redirect to("/note/#{@note.id}")
  end
end
