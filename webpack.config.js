/*
 * @Author: Zhangpengda 
 * @Date: 2018-04-26 18:27:05 
 * @Last Modified by: Zhangpengda
 * @Last Modified time: 2018-05-03 16:13:04
 */

var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin'); //打包后删除旧打包文件
var HtmlWebpackPlugin = require('html-webpack-plugin');   //根据已有html模板生成最新html文件
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');  //压缩插件
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css分离插件
//var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");  //抽离公共代码
var less = require('less');

module.exports = {
  //devtool:'cheap-module-eval-source-map',
  entry:{
    main:
      __dirname + '/app/main.js'
      //__dirname + '/app/main2.js'
  },
  output:{
    path:__dirname + '/public',
    filename:'[name].js',
    publicPath:'/public/'
  },
  // devServer:{
  //   inline:true,
  //   hot:true
  // },
  module:{
    rules:[
      {
        test:/\.js$/,
        loaders:'babel-loader?presets[]=es2015',
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        //loader:'style-loader!css-loader',
        //exclude:/node_modules/,
        //css从js分离
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use:[
            {
                loader: 'css-loader',
                options:{
                    minimize: true //css压缩
                }
            }
          ]
        })
      },
      {
        test:/\.less$/,
        loader:'style-loader!css-loader!less-loader',
        exclude:/node_modules/
      },
      {
        test:/\.scss$/,
        loader:'style-loader!css-loader!sass-loader',
        exclude:/node_modules/
      }
    ]
  },
  plugins:[
    // new CleanWebpackPlugin(
    //   ['public/main.*.js','public/manifest.*.js'],
    //   {
    //     root:__dirname,
    //     verbose:true,
    //     dry:false
    //   }
    // ),
    //模板
    new HtmlWebpackPlugin({ 
      template:'./index.html',
      filename: "./index.html",  
      hash: true, // 会在打包好的bundle.js后面加上hash串 
    }),
    //压缩
    new UglifyJsPlugin({
      exclude:['/node_modules/']
    }),
    //css从js分离
    new ExtractTextPlugin("styles.css")
  ]
}
