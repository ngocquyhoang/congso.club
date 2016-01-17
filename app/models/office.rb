class Office < ActiveRecord::Base
    extend FriendlyId
    friendly_id :title_and_owner, use: :slugged
    
    def title_and_owner
        "#{title} by #{owner}"
    end
end
