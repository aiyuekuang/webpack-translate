import fs from 'fs'
import path from "path"
import {cloneop} from "esn";
import translate from "@vitalets/google-translate-api"


export default class TranslateMain {

    static propTypes = {}

    static defaultProps = {
        /** 查看类型*/
        translateTypes: ["en"],
        /** 输出的语言文件的后缀名*/
        suffix: "js",
        /** 输出的语言文件相对项目根目录的地址 */
        path: './src/components/locales/',
        /** 需作为源语言进行翻译的文件 */
        source: '../src/components/locales/zh_CN.js',
        /** 输出文件的其他名称设置，与上方translateTypes的数组一一对应即可，注意必须保持一致*/
        outputFileName: [],
        /** 翻译源文件的语言简码*/
        from: "zh-CN",
        /** 固定工人工翻译的字段集合，如{en:{head:"tou"}}，结构语言->字段*/
        fixedTranslate: null

    }

    constructor(config) {
        if (config.translateTypes) {
            this.translateTypes = config.translateTypes;
        }
        if (config.suffix) {
            this.suffix = config.suffix;
        }
        if (config.path) {
            this.path = config.path;
        }
        if (config.source) {
            this.source = config.source;
        }
        if (config.outputFileName) {
            this.outputFileName = config.outputFileName;
        }
        if (config.from) {
            this.from = config.from;
        }
        if (config.fixedTranslate) {
            this.fixedTranslate = config.fixedTranslate
        }


        this.file = fs.readFileSync(this.source, "utf-8");
        this.file = this.file.split("export default")[1];
        this.file = (new Function("return " + this.file))();
    }

    run() {
        for (let i of this.translateTypes.keys()) {
            let file = path.resolve(this.path + "/" + this.translateTypes[i] + "." + this.suffix)
            if (this.outputFileName[i]) {
                file = path.resolve(this.path + "/" + this.outputFileName[i] + "." + this.suffix)
            }
            Symbol[this.translateTypes[i]] = cloneop(this.file);
            let str = ""
            this.index = 0
            this.objectLoop(Symbol[this.translateTypes[i]], (data, t) => {
                str += data[t] + this.symbol
            })

            translate(str, {from: this.from, to: this.translateTypes[i]})
                .then((data) => {
                    let splicing = (data.text).split(this.symbol)
                    this.index = 0
                    this.objectLoop(Symbol[this.translateTypes[i]], (data, t) => {
                        // console.log(112233,splicing,this.index)
                        data[t] = splicing[this.index]
                        if (this.fixedTranslate && this.fixedTranslate[this.translateTypes[i]] && this.fixedTranslate[this.translateTypes[i]][t]) {
                            data[t] = this.fixedTranslate[this.translateTypes[i]][t]
                        }
                    });
                    fs.writeFile(file, "export default " + JSON.stringify(Symbol[this.translateTypes[i]], null, 4), {encoding: 'utf8'}, err => {
                    })
                })
                .catch(console.error);

        }
    }

    translateTypes = ["en", "ko", "ja"]
    index = 0;
    symbol = "\n"
    suffix = "js"
    path = './src/components/locales/'
    source = '../src/components/locales/zh_CN.js'
    file = null
    outputFileName = []
    from = "zh-CN"
    fixedTranslate = null

    objectLoop(obj, fun = () => {
    }) {
        for (let i in obj) {
            if (typeof (obj[i]) === "object") {
                this.objectLoop(obj[i], fun)
            } else {
                fun(obj, i)
            }
            this.index++;
        }
    }
}

