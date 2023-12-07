/*
author  : 寒菱
date    : 2020/8/10
desc    : ast 模板
*/

const {parse} = require("@babel/parser");
const fs = require('fs');
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;


let jscode = fs.readFileSync("./test/demo.js", {
    encoding: "utf-8"
});


let ast = parse(jscode);
const visitor =
    {
        //TODO  write your code here！
    }
//some function code
traverse(ast,visitor);
let {code} = generator(ast);


fs.writeFile('./test/newdemo.js', code, (err)=>{});


