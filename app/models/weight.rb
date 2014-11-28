class Weight < ActiveRecord::Base
	belongs_to :location
	belongs_to :trait

end
