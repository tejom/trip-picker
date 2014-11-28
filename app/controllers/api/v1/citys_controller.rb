class Api::V1::CitysController < ApplicationController
	respond_to :json

	def index
		
		render :json => Location.All
	end

	def show
		weightTracker = Hash.new(0)
		locationList = Location.all

		@var = [params[:trait]]
		@attribArray = @var[0]

		@attribArray.each { |t| 
			@t = Trait.find_by name: t
			puts "ok" 
			puts t
			@l = @t.locations.includes(:weights).select('*')
			#need to handle empty results
			@l.each { |l|
				puts l.name
				puts l.weight
				weightTracker[l.name] = l.weight + weightTracker[l.name]
				puts weightTracker[l.name]

			}
		}
		
		weightTracker.each { |w| puts w}
		

		@biggest = largest_hash_key(weightTracker)
		render :json => weightTracker

	end

	def largest_hash_key(hash)
		hash.max_by {|k,v| v }
	end
end