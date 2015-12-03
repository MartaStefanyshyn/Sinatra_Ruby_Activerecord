# require 'sinatra'
# require 'sinatra/activerecord'
# db = URI.parse('postgres://mstef:pass@localhost/template1')

# ActiveRecord::Base.establish_connection(
#   :adapter  => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
#   :host     => db.host,
#   :username => db.user,
#   :password => db.password,
#   :database => db.path[1..-1],
#   :encoding => 'utf8'
# )

# class Note < ActiveRecord::Base
# end

# get "/" do
#   @notes = Note.order("created_at DESC")
#   redirect "/new" if @notes.empty?
#   erb :'notes/index'
# end

# get "/new" do
#   erb :'notes/new'
# end

# post "/new" do
#   @note = Note.new(params[:note])
#   if @note.save
#     redirect "note/#{@note.id}"
#   else
#     erb :'notes/new'
#   end
# end

# get "/note/:id" do
#   @note = Note.find_by_id(params[:id])
#   erb :'notes/note'
# end

# get "/note/:id/edit" do
#   @note = Note.find_by_id(params[:id])
#   erb :'notes/edit'
# end

# post "/note/:id" do
#   @note = Note.find(params[:id])
#   if @note.update_attributes(params[:note])
#     redirect to("/")
#   else
#     erb :'notes/edit'
#   end
# end

# get "/note/:id/destroy" do
#   @note = Note.find_by_id(params[:id])
#   erb :'notes/delete'
# end

# post "/note/:id/destroy" do
#   if params.has_key?("ok")
#     @note = Note.find_by_id(params[:id])
#     @note.destroy
#     redirect to("/")
#   else
#     redirect to("/")
#   end
# end

