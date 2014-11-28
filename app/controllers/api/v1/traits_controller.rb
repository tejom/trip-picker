class Api::V1::TraitsController < ApplicationController
	respond_to :json

	def index
		
		render :json => Trait.all.select('name','id')
	end

	def show
		@var = [params[:attrib]]
		render :json => @var

	end
end