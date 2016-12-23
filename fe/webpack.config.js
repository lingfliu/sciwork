/**
 * Created by liulingfeng on 2016/12/5.
 */
const webpack = require("webpack")
const path = require("path")
module.exports={
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    plugins:[
        //do not pack 3rd party js
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        //compress
        // new webpack.optimize.UglifyJsPlugin({
        //     compress:{
        //         warnings: false
        //     }
        // })
        ]
}
