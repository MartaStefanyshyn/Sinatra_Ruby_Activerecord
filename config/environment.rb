ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

require 'bundler/setup' if File.exists?(ENV['BUNDLE_GEMFILE'])

# Require gems we care about
require 'rubygems'

require 'pg'
require 'sinatra/activerecord'
require 'json'
require 'sinatra'
require 'closure_tree'
require 'rspec/core/rake_task'

APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))
configure do
  set :root, APP_ROOT.to_path
  enable :sessions
  set :session_secret, ENV['SESSION_SECRET'] || 'this is a secret shhhhh'
  set :views, File.join(Sinatra::Application.root, "app", "views")
end
Dir[APP_ROOT.join('app', 'controllers', '*.rb')].each { |file| require file }
Dir[APP_ROOT.join('app', 'helpers', '*.rb')].each { |file| require file }

require APP_ROOT.join('config', 'database')
