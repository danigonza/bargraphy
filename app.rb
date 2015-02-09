require "sinatra"
require "instagram"

enable :sessions

CALLBACK_URL = "http://localhost:4567/oauth/callback"

Instagram.configure do |config|
  config.client_id = "af5f708adf794ad8a5ac2b26ee0c4912"
  config.client_secret = "77f8e82678fc49a6926a31ba201b15ce"
end

get "/" do
  client = Instagram.client(:access_token => session[:access_token])
  html = ""
  for media_item in client.tag_recent_media('notegraphy', {:count => 100})
    html << "<img src='#{media_item.images.low_resolution.url}'>"
  end
  html
end