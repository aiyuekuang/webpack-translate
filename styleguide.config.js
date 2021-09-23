const path = require('path')
const packagePath = path.resolve(
    __dirname,
    'package.json'
)
const packageFile = require(packagePath)


module.exports = {
    webpackConfig: {
        module: {
            rules: [
                // Babel loader will use your project’s babel.config.js
                // {
                //     test: /\.mjs?$/,
                //     exclude: /node_modules/,
                //     loader: 'babel-loader'
                // },
                // Other loaders that are needed for your components
                {
                    test: /\.(less|css)$/,
                    use: ['style-loader', 'css-loader',{loader: 'less-loader', options: {javascriptEnabled: true}}]
                }
            ]
        }
    }, // webpack 路径,可以用项目里的,也可以用webpack-blocks创建
    components: './src/translate/main.mjs', // 写入对应目录的文档
    // defaultExample: true,
    // verbose: true, // 打印详细信息
    updateDocs(docs, file) {
        if (docs.doclets.version) {
            const version = packageFile.version

            docs.doclets.version = version
            docs.tags.version[0].description = version
        }

        return docs
    }, // 在使用 @version 时 使用 package.json 的 version
    version: packageFile.version, // 同上 使用 package.json 的 version
    usageMode: 'expand', // 自动打开文档的缩放
    pagePerSection: true, // 是否每页一个组件显示
    title: "webpack-translate", // 文档名
    // exampleMode: 'expand',
}