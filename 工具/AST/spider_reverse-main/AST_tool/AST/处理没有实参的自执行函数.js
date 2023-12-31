/*
author  : 寒菱
date    : 2020/8/11
desc    : 
*/

const fs = require('fs');
const {parse} = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

// let jscode = "!function () {\n" +
//     "  a = 123;\n" +
//     "}();";

let jscode = fs.readFileSync("./test/demo.js", {
    encoding: "utf-8"
});

let ast = parse(jscode);

const visitor = {

    UnaryExpression(path) {
        const {operator, argument} = path.node;

        if (operator !== "!" || !t.isCallExpression(argument)) return;

        let {callee, arguments} = argument;

        if (!t.isFunctionExpression(callee) || arguments.length !== 0) return;

        path.replaceInline(callee.body.body);

    },

}


//some function code


traverse(ast, visitor);
let {code} = generator(ast);
// console.log(code);
fs.writeFile('./test/newdemo.js', code, (err)=>{});
