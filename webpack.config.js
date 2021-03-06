var path = require('path');

var Webpack = require('webpack');
var host = process.env.APP_HOST || 'localhost';
var entryPath = path.resolve(__dirname, 'client', 'js', 'app.js');
var autoprefixer = require('autoprefixer');

var config = {
    devtool: 'eval',
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://' + host + ':3001',
        entryPath
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['ng-annotate', 'babel-loader', 'jshint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css!postcss'
            },
            {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    postcss: [autoprefixer],
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.ProvidePlugin({
            _: "lodash"
        }),
        new Webpack.EnvironmentPlugin(['SERVICE_ROOT', 'API_TOKEN'])
    ]
};

module.exports = config;