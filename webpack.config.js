const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
//const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;

module.exports = {
    resolve: {
      fallback: {"path": require.resolve("path-browserify")}
    },
    entry: [
        './src/js/index.js',
        'babel-polyfill'
    ],//multiple entry points
    output: {
        path: path.resolve(__dirname, 'dist'),//path.resolve(__dirname, 'dist'),//absolute path
        filename: 'js/bundle.js'
    },
    devServer:{
      static: path.resolve(__dirname, 'dist'),
      //static: path.resolve(__dirname, 'src/templates'),
      compress: true,
      port: 8080,
    },
    plugins:[
        
      new CopyPlugin({
              patterns:[
                //copy images in source folder over to distribution folder
                { from: './src/img/',to:'./img/'},
                //copy stylesheet in source folder over to distribution folder
                { from: './src/js/stylesheet.css',to:'./js/'},
                ///{ from: './src/resources/',to:'./resources/'},
              ]
      }),
      require('autoprefixer'),
      require('postcss-nested'),
      new HtmlWebpackPlugin({
          filename: './index.html', //output ./templates/index.html',
          template: './src/templates/index.html', //input
		  inject: false
		  //chunksSortMode: 'dependency'
	  }),
      new HtmlWebpackPlugin({
        filename: './recipe.html', //output ./templates/index.html',
        template: './src/templates/recipe.html', //input
		inject: false
		//chunksSortMode: 'dependency'
    })
    
    ],
        
    module: {
        rules: [
            {
                test: /\.js$/, //regex all js files will use babel loader 
				        //include: ['/node_modules/bootstrap/dist/js/','/node_modules/jquery/dist/'],
                exclude: /node_modules/, //dont want rules to apply to the node module js files
                use:{
                    loader: 'babel-loader'
                }
            },
            {
              test: /\.js$/, 
              enforce:'pre',
              use: ['source-map-loader'],
              
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(scss)$/,
                use: [{
                  loader: 'style-loader', // inject CSS to page
                }, {
                  loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                  loader: 'postcss-loader', // Run post css actions
                  options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                      return [
                        require('precss'),
                        require('autoprefixer')
                      ];
                    }
                  }
                }, {
                  loader: 'sass-loader' // compiles Sass to CSS
                }]
              },
            {
                test: /\.(png|svg|jpg|gif|pdf)$/,
                //include: '/src/images',
                use: {
                 loader: 'file-loader',
                 options:{
                     name: '[path][name].[ext]',
					 context:'src',
                     outputPath: './'
                 }
                }
            },
            {
                test: /\.(zip|tar|gz)$/,
                use: {
                 loader: 'file-loader',
                 options:{
                     name: '[path][name].[ext]',
					 context:'src',
                     outputPath: './'
                 }
                }
            },

        ]
    }
};