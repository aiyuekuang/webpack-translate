# webpack-translate
[中文](https://github.com/aiyuekuang/webpack-translate/blob/master/README.md) | [EN](https://github.com/aiyuekuang/webpack-translate/blob/master/README.en.md)


Install：

```
npm install webpack-translate
or
yarn add webpack-translate
```



Use：

```js
//webpack.config.js
//Plugins property in webpack configuration

plugins: [
            new Tarnslate({
                translateTypes:["en", "ko", "ja","gd"],
                suffix:"js",
                path:path.resolve(__dirname,"./src/components/locales"),
                source:path.resolve(__dirname,"./src/components/locales/zh_CN.js")
            }),
           //Other wenpack plugins
        ]
```



Document：

| api            | type          | Default value                               | explain                                                         |
| -------------- | ------------- | ------------------------------------ | ------------------------------------------------------------ |
| translateTypes | array[string] | ["en"]                               | 需翻译的目标语言简写，[地址](https://github.com/aiyuekuang/webpack-translate/blob/master/src/translate/utils/lang.js) |
| suffix         | string        | "js"                                 | 输出的语言文件的后缀名                                       |
| path           | string        | './src/components/locales/'          | 输出的语言文件相对项目根目录的地址                           |
| source         | string        | '../src/components/locales/zh_CN.js' | 需作为源语言进行翻译的文件                                   |



