class CreateViewPages < ActiveRecord::Migration
  def change
    create_table :view_pages do |t|
	t.integer :home_page,					:null => false, :default => 0
	t.integer :zorba_page,					:null => false, :default => 0
	t.integer :contact_page,				:null => false, :default => 0
	t.integer :contributed_image_page,	:null => false, :default => 0

      t.timestamps null: false
    end
  end
end
