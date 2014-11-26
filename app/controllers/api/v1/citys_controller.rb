class Api::V1::CitysController < ApplicationController
	respond_to :json

	def index
		render :json => 'text tes'
	end

	def show
		@var = [params[:id]]
		render :json => @var

	end
end