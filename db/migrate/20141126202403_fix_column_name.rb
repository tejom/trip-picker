class FixColumnName < ActiveRecord::Migration
  def change
  	rename_column :weights, :attribute_id , :trait_id
  end
end
