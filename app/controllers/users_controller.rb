get '/api/users' do
  if current_user
    @user = User.find(current_user.id)
    @user.to_json
  else
    status 403
  end
end

put "/api/users" do
  if current_user
    data = JSON.parse(request.body.read)
    @user = User.find(current_user.id)
    if @user.update(data)
      @user.to_json
    else
      halt 404
    end
  else
    halt 403
  end
end

post '/api/login' do
  data = JSON.parse(request.body.read)
  user = User.find_by(username: data['username']).try(:authenticate, data['password'])

  if user
    session[:user_id] = user.id
    {session: session[:user_id]}.to_json
  else
    halt 403
  end
end

get '/auth/:provider/callback' do
  auth_hash = request.env['omniauth.auth']
  user = User.find_by(username: auth_hash['info']['name']).try(:authenticate, auth_hash.uid)

  if user
    session[:user_id] = user.id
    {session: session[:user_id]}.to_json
  else
    user = User.new(username: auth_hash['info']['name'], password: auth_hash.uid)
    if user.save
      session[:user_id] = user.id
      {session: session[:user_id]}.to_json
    end
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

