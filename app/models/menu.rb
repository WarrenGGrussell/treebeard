class Menu < ActiveRecord::Base
	mount_uploader :image, PictureUploader
end
