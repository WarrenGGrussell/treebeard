class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.string :product 
      t.string :location
      t.string :kind 
      t.text :description 
      t.string :image 
      t.integer :gram
      t.integer :eigth 
      t.integer :quart 
      t.integer :half 
      t.integer :ounce 
      t.timestamps
    end
  end
end
