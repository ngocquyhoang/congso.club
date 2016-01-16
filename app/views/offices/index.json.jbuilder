json.array!(@offices) do |office|
  json.extract! office, :id, :title, :owner, :image, :like, :dislike
  json.url office_url(office, format: :json)
end
