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
import Translate from "webpack-translate";


plugins: [
            new Translate({
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
| translateTypes | array[string] | ["en"]                               | Target language abbreviation to be translated, query abbreviation [address](https://github.com/aiyuekuang/webpack-translate/blob/master/src/translate/utils/lang.js) |
| suffix         | string        | "js"                                 | The suffix of the output language file                                       |
| path           | string        | './src/components/locales/'          | The address of the output language file relative to the project root directory                          |
| source         | string        | '../src/components/locales/zh_CN.js' | Documents to be translated as source language                                   |



