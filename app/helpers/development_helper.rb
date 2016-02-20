module DevelopmentHelper
	def facebook_shares(url)
		data = Net::HTTP.get(URI.parse("https://api.facebook.com/method/links.getStats?urls=%%#{URI.escape(url)}&format=json"))
		data = JSON.parse(data)
		data[0]
	end
end
