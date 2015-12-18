get "/api/notes" do
  @notes = Note.all
  @notes.to_json
end

post "/api/notes" do
  data = JSON.parse(request.body.read)
  @note = Note.new(data)
  if @note.save
    @note.to_json
  else
    halt 500
  end
end

get "/api/notes/:id" do
  @note = Note.includes(:comments).find_by_id(params[:id])
  @comments = Comment.convert(@note.comments, 0)
  {note: @note, comments: @comments}.to_json
end

put "/api/notes/:id" do
  data = JSON.parse(request.body.read)
  @note = Note.find(params[:id])
  if @note.update(data)
    @note.to_json
  else
    halt 404
  end
end

delete "/api/notes/:id" do
  @note = Note.find_by_id(params[:id])
  @note.destroy
  if @note.destroy
    {:success => "ok"}.to_json
  else
    halt 500
  end
end

get "/api/count" do
  @notes = Note.joins(:comments).group("notes.id").select("notes.title, count(comments.note_id) as comments_count")
  @notes.to_json
end

