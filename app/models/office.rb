class Office < ActiveRecord::Base
    extend FriendlyId
    friendly_id :title_and_owner, use: :slugged
    # customize url
    def title_and_owner
        "#{title} by #{owner}"
    end
    # upload images
    mount_uploader :image, ImagesUploader 
end
