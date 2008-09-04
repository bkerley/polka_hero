require 'rake'

task 'javascript_dependencies'=> ['javascripts', 'prototype', 'scriptaculous']

directory 'javascripts' do
	mkdir_p 'javascripts'
end

task 'prototype' => ['javascripts', 'javascripts/prototype.js']
task 'scriptaculous' do |t|
	Dir::glob('vendor/scriptaculous/src/*.js').each do |f|
		FileUtils::cp f, 'javascripts/'
	end
end

file 'javascripts/prototype.js' => ['javascripts'] do |t|
	sh 'cd vendor/prototype && rake dist'
	cp 'vendor/prototype/dist/prototype.js', 'javascripts/'
end