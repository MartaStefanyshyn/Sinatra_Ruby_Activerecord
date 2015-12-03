get '/login' do
  erb :login
end

post '/login' do
  user = User.find_by(username: params[:user][:username]).try(:authenticate, params[:user][:password])

  if user
    session[:user_id] = user.id
    redirect("/")
  else
    set_error("Username not found or password incorrect.")
    redirect("/login")
  end
end

get '/signup' do
  erb :signup
end

get '/logout' do
  session[:user_id] = nil
  redirect("/")
end

post '/signup' do
  user = User.new(params[:user])
  if user.save
    session[:user_id] = user.id
    redirect("/")
  else
    session[:error] = user.errors.messages
    redirect("/signup")
  end
end
