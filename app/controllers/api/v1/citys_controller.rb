class Api::V1::CitysController < ApplicationController
	respond_to :json

	def index
		
		render :json => Location.All
	end

	def show
		@var = [params[:attrib]]
		render :json => @var

	end
end