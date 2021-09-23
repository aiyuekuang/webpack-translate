import fs from 'fs'
import path from "path"
// const translateOrg = require("../components/locales/zh_CN");
import {cloneop} from "esn";
import translate from "@vitalets/google-translate-api"
import TranslateMain from "./main";

export default class Translate {
    constructor(config) {
        this.config = config;
    }

    apply(compiler) {
        compiler.hooks.emit.tap("compile", (compilation) => {
            new TranslateMain(this.config).run()
            console.log("翻译")
        })
    }
}
