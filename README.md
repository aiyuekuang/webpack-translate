# webpack-translate

[中文](https://github.com/aiyuekuang/webpack-translate/blob/master/README.md) | [EN](https://github.com/aiyuekuang/webpack-translate/blob/master/README.en.md)



安装：

```
npm install webpack-translate
or
yarn add webpack-translate
```



使用：

```js
//webpack.config.js
//webpack配置中的plugins属性
import Translate from "webpack-translate";


plugins: [
            new Translate({
                translateTypes:["en", "ko", "ja","gd"],
                suffix:"js",
                path:path.resolve(__dirname,"./src/components/locales"),
                source:path.resolve(__dirname,"./src/components/locales/zh_CN.js")
            }),
           //其他wenpack插件
        ]
```



文档：

| api            | 类型          | 默认值                               | 说明                                                         |
| -------------- | ------------- | ------------------------------------ | ------------------------------------------------------------ |
| translateTypes | array[string] | ["en"]                               | 需翻译的目标语言简写，查询简写[地址](https://github.com/aiyuekuang/webpack-translate/blob/master/src/translate/utils/lang.js) |
| suffix         | string        | "js"                                 | 输出的语言文件的后缀名                                       |
| path           | string        | './src/components/locales/'          | 输出的语言文件相对项目根目录的地址                           |
| source         | string        | '../src/components/locales/zh_CN.js' | 需作为源语言进行翻译的文件                                   |
| outputFileName | array[string] | []                                   | 输出文件的其他名称设置，与上方translateTypes的数组一一对应即可，注意个数必须保持一致 |
| from           | string        | "zh-CN"                              | 翻译源文件的语言简码                                         |
| fixedTranslate | object        | null                                 | 固定工人工翻译的字段集合，如{en:{head:"tou"}}，结构：translateTypes语言类型 -> 字段 |



