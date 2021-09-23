import fs from 'fs'
import path from "path"
import {cloneop} from "esn";
import translate from "@vitalets/google-translate-api"

const __dirname = path.resolve();

export default class TranslateMain {

    static propTypes = {}

    static defaultProps = {
        /** 查看类型*/
        translateTypes: ["en", "ko", "ja"],
        /** 输出的语言文件的后缀名*/
        suffix: "js",
        /** 输出的语言文件相对项目根目录的地址 */
        path: './src/components/locales/',
        /** 需作为源语言进行翻译的文件 */
        source: '../src/components/locales/zh_CN.js'
    }

    constructor(config) {
        this.translateTypes = config.translateTypes;
        this.suffix = config.suffix
        this.path = config.path
        this.source = config.source

        this.file = fs.readFileSync(this.source, "utf-8");
        this.file = this.file.split("export default")[1];
        this.file = (new Function("return " + this.file))();
        console.log(typeof this.file)
    }

    run() {
        for (let i of this.translateTypes) {
            let file = path.resolve(this.path + "/" + i + "." + this.suffix)
            Symbol[i] = cloneop(this.file);
            let str = ""
            this.index = 0
            this.objectLoop(Symbol[i], (data, t) => {
                str += data[t] + this.symbol
            })

            translate(str, {from: "zh-CN", to: i})
                .then((data) => {
                    let splicing = (data.text).split(this.symbol)
                    this.index = 0
                    this.objectLoop(Symbol[i], (data, t) => {
                        // console.log(112233,splicing,this.index)
                        data[t] = splicing[this.index]
                    });
                    fs.writeFile(file, "export default " + JSON.stringify(Symbol[i], null, 4), {encoding: 'utf8'}, err => {
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

