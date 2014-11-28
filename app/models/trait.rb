class Trait < ActiveRecord::Base
	has_many :weights
	has_many :locations , :through => :weights
end
