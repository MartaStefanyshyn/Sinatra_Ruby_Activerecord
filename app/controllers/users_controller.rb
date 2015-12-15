get '/api/users' do
  @users = User.all
  @users.to_json
end

get '/api/users/:id' do
  @user = User.find(params[:id])
  @user.to_json
end

post '/api/users' do
  data = JSON.parse(request.body.read)
  user = User.new(data)
  if user.save
    user.to_json
  else
    halt 500
  end
end

put "/api/users/:id" do
  data = JSON.parse(request.body.read)
  @user = User.find(params[:id])
  if @user.update(data)
    @user.to_json
  else
    halt 404
  end
end

delete "/api/users/:id" do
  @user = User.find_by_id(params[:id])
  @user.destroy
  if @user.destroy
    {:success => "ok"}.to_json
  else
    halt 500
  end
end

post '/api/login' do
  data = JSON.parse(request.body.read)
  puts data['username']
  user = User.find_by(username: data['username']).try(:authenticate, data['password'])

  if user
    session[:user_id] = user.id
    {session: session[:user_id]}.to_json
  else
    halt 403
  end
end

get '/api/logout' do
  session[:user_id] = nil
  halt 204
end

post '/api/signup' do
  data = JSON.parse(request.body.read)
  user = User.new(data)
  if user.save
    session[:user_id] = user.id
    {session: session[:user_id]}.to_json
  else
    halt 403
  end
end

get '/api/logged_in' do
  @user =  User.find_by_id(session[:user_id]) if session[:user_id]
  if @user
    username = @user.username
    {username: username, id: @user.id}.to_json
  else
    {username: ''}.to_json
  end
end

