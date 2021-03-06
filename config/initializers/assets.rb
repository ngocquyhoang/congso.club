# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path
Rails.application.config.assets.paths << "#{Rails.root}/app/assets/fonts"
# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
# add favico
Rails.application.config.assets.precompile += %w( favico.png )
Rails.application.config.assets.precompile += %w( per-logo.png )
Rails.application.config.assets.precompile += %w( loadding.svg )
Rails.application.config.assets.precompile += %w( like-while.png )
Rails.application.config.assets.precompile += %w( ngocquy-avatar.jpg )
Rails.application.config.assets.precompile += %w( zorba-story.jpg )
Rails.application.config.assets.precompile += %w( like-button-ver-2.png )
Rails.application.config.assets.precompile += %w( contributed )
Rails.application.config.assets.precompile += %w( 404-text.jpg )
Rails.application.config.assets.precompile += %w( 500-text.jpg )
