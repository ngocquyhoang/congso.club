class CreateOffices < ActiveRecord::Migration
  def change
    create_table :offices do |t|
      t.text :title
      t.text :owner
      t.text :image
      t.integer :like
      t.integer :dislike

      t.timestamps null: false
    end
  end
end
