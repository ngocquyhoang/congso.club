class CreateOffices < ActiveRecord::Migration
  def change
    create_table :offices do |t|
      t.text        :title
      t.text        :owner
      t.text        :image
      t.text        :slug
      t.integer     :like,      null:false, default: 0

      t.timestamps null: false
    end
  end
end
