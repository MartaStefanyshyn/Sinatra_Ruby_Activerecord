ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

require 'bundler/setup' if File.exists?(ENV['BUNDLE_GEMFILE'])

# Require gems we care about
require 'rubygems'

require 'pg'
require 'sinatra/activerecord'

require 'sinatra'

APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))
Dir[APP_ROOT.join('app', 'controllers', '*.rb')].each { |file| require file }

require APP_ROOT.join('config', 'database')
