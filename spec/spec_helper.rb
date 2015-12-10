ENV['RACK_ENV'] = 'test'

require File.join(File.dirname(__FILE__), "..", "config/environment.rb")
require "rack/test"
require "rspec"
require 'sinatra'
require 'database_cleaner'
require 'shoulda-matchers'
require 'closure_tree/test/matcher'
RSpec::Core::RakeTask.new :specs do |task|
  task.pattern = Dir['spec/**/*_spec.rb']
end
task :default => ['specs']
set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false

RSpec.configure do |config|
  config.include Rack::Test::Methods
  config.include ClosureTree::Test::Matcher, type: :model

  DatabaseCleaner.strategy = :truncation

  config.before(:each) do
    DatabaseCleaner.clean
  end

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.filter_run :focus
  config.run_all_when_everything_filtered = true

  config.disable_monkey_patching!

  config.warnings = true

  if config.files_to_run.one?
    config.default_formatter = 'doc'
  end

  config.profile_examples = 10

  config.order = :random

  Kernel.srand config.seed
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :active_record
  end
end
