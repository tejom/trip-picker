class Location < ActiveRecord::Base
	has_many :weights
	#has_many :attributes, :through => :weights , as: => :qualities

	has_many :traits, :through => :weights
end
