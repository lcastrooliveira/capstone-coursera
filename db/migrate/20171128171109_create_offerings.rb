class CreateOfferings < ActiveRecord::Migration
  def change
    create_table :offerings do |t|
      t.string :title, null: false
      t.text :desc, null: false

      t.timestamps null: false
    end
    add_index :offerings, :title
  end
end
