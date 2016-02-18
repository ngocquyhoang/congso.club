class CreateUserImages < ActiveRecord::Migration
	def change
		create_table :user_images do |t|
			t.text 			:name
			t.text 			:email
			t.text 			:title
			t.text 			:noted
			t.text 			:image_upload
			t.text 			:image_link
			t.text 			:image_idea
			t.timestamps null: false
		end
	end
end
