class DropTable < ActiveRecord::Migration
  def change
  	drop_table :attributes
  end
end
