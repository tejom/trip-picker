class AddIndexToAttributesName < ActiveRecord::Migration
  def change
  	add_index :attributes, :name
  end
end
