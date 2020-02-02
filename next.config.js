const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')


module.exports = withPlugins([
	withCSS,
	withSass,
  withImages,
])