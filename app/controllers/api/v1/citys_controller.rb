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
			@l = @t.locations.includes(:weights).select('*')
			#need to handle empty results
			@l.each { |l|
				weightTracker[l.name] = l.weight + weightTracker[l.name]
				

			}
		}
		
		weightTracker.each { |w| puts w}
		

		@biggest = largest_key(weightTracker)
		render :json => @biggest


	end

	def largest_key(hash)
		arr = []
		hash.each {|k,v| arr << k if v == hash.values.max }
		return arr
	end
end