class AddThingsAndOwnerToOfferings < ActiveRecord::Migration
  def change
    add_reference :offerings, :thing, index: true
    add_column :offerings, :owner, :text, null: false
  end
end
