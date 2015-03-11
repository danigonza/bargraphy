require "sinatra"
require "instagram"

enable :sessions

NUMBER_NOTES = 100

CALLBACK_URL = "http://localhost:4567/oauth/callback"

Instagram.configure do |config|
  config.client_id = "af5f708adf794ad8a5ac2b26ee0c4912"
  config.client_secret = "77f8e82678fc49a6926a31ba201b15ce"
end

get "/" do
  @list = []
  @num = NUMBER_NOTES
  erb :index, locals: { num: NUMBER_NOTES, list_of_images_lists: @list }
end

get '/get_images' do
  @num = NUMBER_NOTES
  @client = Instagram.client(:access_token => session[:access_token])
  @list_of_images_lists = get_instagram_images(@num)
  erb :index, locals: { num: NUMBER_NOTES, list_of_images_lists: @list_of_images_lists }
end

def get_instagram_images(num_images)
	i = 0
	images = []
	max_id_tag = nil
	while i < num_images  do
   		images_list = @client.tag_recent_media('notegraphy', {:max_id => max_id_tag})
   		max_id_tag = images_list.pagination[:next_max_tag_id]
   		i = i + images_list.count
   		images << images_list
	end
  	images
end	