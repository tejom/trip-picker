class CreateTraits < ActiveRecord::Migration
  def change
    create_table :traits do |t|
      t.string :name
      t.timestamps
    end

    add_index :traits, :name
  end
end
