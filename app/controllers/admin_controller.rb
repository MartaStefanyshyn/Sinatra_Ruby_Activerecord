get '/admin/users' do
  if current_user && current_user.role == 'admin'
    @users = User.all
    @users.to_json
  else
    halt 403
  end
end

get '/admin/users/:id' do
  if current_user
    @user = User.find(params[:id])
    @user.to_json
  else
    status 403
  end
end

post '/admin/users' do
  if current_user && current_user.role == 'admin'
    data = JSON.parse(request.body.read)
    user = User.new(data)
    if user.save
      user.to_json
    else
      halt 500
    end
  else
    halt 403
  end
end

put "/admin/users/:id" do
  if current_user && current_user.role == 'admin'
    data = JSON.parse(request.body.read)
    @user = User.find(params[:id])
    if @user.update(data)
      @user.to_json
    else
      halt 404
    end
  else
    halt 403
  end
end

delete "/admin/users/:id" do
  if current_user && current_user.role == 'admin'
    @user = User.find_by_id(params[:id])
    @user.destroy
    if @user.destroy
      {:success => "ok"}.to_json
    else
      halt 500
    end
  else
    halt 403
  end
end
