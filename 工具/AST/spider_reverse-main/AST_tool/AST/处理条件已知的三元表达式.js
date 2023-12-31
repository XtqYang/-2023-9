/*
author  : 寒菱
date    : 2020/8/12
desc    : 
*/

const fs = require('fs');
const {parse} = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

// let jscode = "a = 5 ? 11 : 22;\n" +
//     "b = 0 ? 33 : 44;";
let jscode = fs.readFileSync("./test/demo.js", {
    encoding: "utf-8"
});
let ast = parse(jscode);

const visitor =
    {
        ConditionalExpression(path) {
            let { test, consequent, alternate } = path.node;

            if (!t.isLiteral(test)) return;

            if (test.value) {
                path.replaceInline(consequent);
            } else {
                path.replaceInline(alternate);
            }
        }
    }

//some function code

traverse(ast, visitor);
let {code} = generator(ast);
// console.log(code);
fs.writeFile('./test/newdemo.js', code, (err)=>{});

// 和常见表达式的计算类似