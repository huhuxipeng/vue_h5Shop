
// 'use strict'
// Template version: 1.1.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  // build: {
  //   env: require('./prod.env'),
  //   index: path.resolve(__dirname, '../dist/index.html'),
  //   assetsRoot: path.resolve(__dirname, '../dist'),
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: './',
  //   productionSourceMap: true,
  //   // Gzip off by default as many popular static hosts such as
  //   // Surge or Netlify already gzip all static assets for you.
  //   // Before setting to `true`, make sure to:
  //   // npm install --save-dev compression-webpack-plugin
  //   productionGzip: false,
  //   productionGzipExtensions: ['js', 'css'],
  //   // Run the build command with an extra argument to
  //   // View the bundle analyzer report after build finishes:
  //   // `npm run build --report`
  //   // Set to `true` or `false` to always turn it on or off
  //   bundleAnalyzerReport: process.env.npm_config_report
  // },
  build: {
    env: {
        NODE_ENV: '"production"'
    },
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },

  dev: {
    env: {
        NODE_ENV: '"development"'
    },
    port: process.env.PORT || 9090,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    proxyTable: {
//  	'/':{
//  		target:'http://192.168.2.243:5555/',
//  		changeOrigin:true,
//  		withCredentials:true,
//  		secure:false,
//				pathRewrite:{
//					'^/':''
//				}
//			}
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }

  // dev: {
  //       env: {
  //           NODE_ENV: '"development"'
  //       },
  //       port: 9090,
  //       assetsSubDirectory: 'static',
  //       assetsPublicPath: '/',
  //       context: [ //代理路径
  //           // '/shopping',
  //           // '/ugc',
  //           // '/v1',
  //           // '/v2',
  //           // '/v3',
  //           // '/v4',
  //           // '/bos',
  //           // '/member',
  //           // '/promotion',
  //           // '/eus',
  //           // '/payapi',
  //           // '/img',
  //       ],
  //       // proxypath: 'http://cangdu.org:8001',
  //       // CSS Sourcemaps off by default because relative paths are "buggy"
  //       // with this option, according to the CSS-Loader README
  //       // (https://github.com/webpack/css-loader#sourcemaps)
  //       // In our experience, they generally work as expected,
  //       // just be aware of this issue when enabling this option.
  //       cssSourceMap: false
  //   }
}
