get "/api/comments" do
  @comments = Comment.convert(Comment.all, 0)
  @comments.to_json
end

post "/api/comments" do
  data = JSON.parse(request.body.read)
  @comment = Comment.new(data)
  if @comment.save
    @comment.to_json
  else
    halt 500
  end
end

get "/api/comments/:id" do
  @comment = Comment.find_by_id(params[:id])
  @comment.to_json
end

put "/api/comments/:id" do
  data = JSON.parse(request.body.read)
  @comment = Comment.find(params[:id])
  if @comment.update_attributes(data)
    @comment.to_json
  else
    halt 500
  end
end

delete "/api/comments/:id" do
  @comment = Comment.find_by_id(params[:id])
  @comment.destroy
end

get '/api/comments_group' do
  @comments = Comment.group("comments.created_at::date").select("comments.created_at::date, count(comments.created_at::date) as comments_count")
  #@comments = Comment.group("DATE_TRUNC('day', created_at)").count
  @comments.to_json
end

