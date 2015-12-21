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
  comment = Comment.arel_table
  result = Comment.select(["comments.created_at::date", comment[:created_at].count]).
                    group("comments.created_at::date").to_a
  result.to_json
end


