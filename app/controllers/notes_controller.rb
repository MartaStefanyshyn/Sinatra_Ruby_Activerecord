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
  @comments = Array.new
  @note = Note.includes(:comments).find_by_id(params[:id])
  @note.comments.each do |comment|
    @comments.push comment
  end
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

