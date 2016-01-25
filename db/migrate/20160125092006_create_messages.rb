class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :name
      t.text :mail
      t.text :message

      t.timestamps null: false
    end
  end
end
