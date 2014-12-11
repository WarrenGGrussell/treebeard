json.array!(@menus) do |menu|
  json.extract! menu, :id, :string, :string, :text, :string, :integer, :integer, :integer, :integer, :integer
  json.url menu_url(menu, format: :json)
end
