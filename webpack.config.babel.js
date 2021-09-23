import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {devPort, title, ip} from "./config"
import Tarnslate from "./lib/index"
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


export default (env = "development", argv = {mode: "development"}) => {
    let isDev = argv.mode

    return {
        entry: {
            index: ['babel-polyfill', './src/index.js']
        },
        optimization: {
            runtimeChunk: {
                name: 'manifest'
            },
            minimizer: [
                // new CssMinimizerPlugin({
                //     parallel: 4,
                //     // cssProcessorOptions: cssnanoOptions,
                // }),
            ],
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: false,
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        chunks: 'initial',
                        priority: -10,
                        reuseExistingChunk: false,
                        test: /node_modules\/(.*)\.js/
                    },
                    // styles: {
                    //     name: 'op-charts',
                    //     test: /\.(scss|css)$/,
                    //     chunks: 'all',
                    //     minChunks: 1,
                    //     reuseExistingChunk: true,
                    //     enforce: true
                    // }
                }
            }
        },
        plugins: [
            new Tarnslate({
                translateTypes:["en", "ko", "ja","gd"],
                suffix:"js",
                path:path.resolve(__dirname,"./src/components/locales"),
                source:path.resolve(__dirname,"./src/components/locales/zh_CN.js")
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, './src/index.ejs'), // Load a custom template
                title,
                ip,
                devPort
            }), new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, './public'),
                    to: path.resolve(__dirname, './dist'),
                }
            ]),
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
            alias: {
                "@components": path.resolve(__dirname, "src/components"),
                "@utils": path.resolve(__dirname, "src/utils")
            }
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'dist'),
            chunkFilename: 'js/[chunkhash].js', //按需加载名称
            publicPath: `http://${ip}:${devPort}/`
        },
        devtool: false,
        module: {
            rules: [{
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader?importLoaders=1',
                    options: {
                        minimize: true, //压缩
                        // sourceMap: minimize[dev],
                    },
                }, "sass-loader"]
            }, {
                test: /\.(less|css)$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader?importLoaders=1',
                    options: {
                        minimize: true, //压缩
                        // sourceMap: minimize[dev],
                    },
                }, {loader: 'less-loader', options: {javascriptEnabled: true}}]
            }, {
                test: /\.(png|jpg|gif|md)$/,
                use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader']
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }]
        },
        devServer: {//webpack-dev-server配置热更新以及跨域
            // contentBase: path.join(__dirname, 'dist'), //开发服务运行时的文件根目录
            historyApiFallback: true,//不跳转
            // noInfo: true,
            // overlay: true,
            // inline: true,//实时刷新
            host: ip,
            port: devPort,
            hot: true,
            proxy: {
                '/api': {
                    target: 'http://183.224.44.51:9011/Api',
                    pathRewrite: {'^/api': ''},
                    changeOrigin: true,
                    secure: false
                }
            }
        }
    };
};