class CreateWeights < ActiveRecord::Migration
  def change
    create_table :weights do |t|
      t.integer :weight
      t.belongs_to :location
      t.belongs_to :attribute

      t.timestamps
    end
  end
end
