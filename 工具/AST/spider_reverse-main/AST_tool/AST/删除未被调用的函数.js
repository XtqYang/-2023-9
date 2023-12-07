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

// let jscode = "function i()\n" +
//     "\n" +
//     "{\n" +
//     "\n" +
//     "    var i = 123;\n" +
//     "\n" +
//     "    i += 2;\n" +
//     "\n" +
//     "    \n" +
//     "\n" +
//     "  return 123;\n" +
//     "\n" +
//     "}";
let jscode = fs.readFileSync("./test/demo.js", {
    encoding: "utf-8"
});



let ast = parse(jscode);

const visitor =
    {
        FunctionDeclaration(path) {
            // path.scope.dump();

            const {id} = path.node;
            const binding = path.scope.parent.getBinding(id.name);

            if (!binding || binding.constantViolations.length > 0) {
                return;
            }

            if (binding.referencePaths.length === 0) {
                path.remove();
            }
        },
    }


//some function code


traverse(ast,visitor);
let {code} = generator(ast);
// console.log(code);
fs.writeFile('./test/newdemo.js', code, (err)=>{});
