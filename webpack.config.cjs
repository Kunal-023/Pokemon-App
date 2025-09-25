const HtmlWebpackPlugin = require("html-webpack-plugin");
const path=require('path');

module.exports={
    mode :'development',
    target:'web',
    entry:'./src/index.tsx',
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist'),
        assetModuleFilename : 'images/[name][ext]',
    },
    devServer:{
        historyApiFallback: true,
        open: true,
        static : path.resolve(__dirname,'dist'),
        port : 5500
    },
    plugins:[
        new HtmlWebpackPlugin({
            template :'./src/index.html',
        })
    ],
    module:{
        rules:[
            {
                test :/\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    loader : 'babel-loader',
                    options : {
                        presets:[
                            '@babel/preset-env',
                            ['@babel/preset-react',{'runtime':'automatic'}],
                            '@babel/preset-typescript', 
                        ]
                    }
                }

            },
            {
                test :/\.css$/,
                use : ['style-loader', 'css-loader']
            },
            {
                test : /\.(png|svg|jpg|jpeg|gif)$/,
                type : 'asset/resources'
            },
        ]
    },
    resolve:{
        extensions : ['.tsx' , '.ts', '.jsx', '.js'] 
    }
}