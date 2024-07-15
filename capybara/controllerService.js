var colors = require("colors");
var path = require("path");
var str = require("case");
const fs = require("node:fs");

colors.enable();

const make = (name) => {
  if (name) {
    fs.writeFile(
      path.join(__dirname, `../src/controllers/${str.camel(name)}Controller.ts`),
      `import { Request, Response } from "express";\n\nconst index = (request: Request, response: Response) => {\n\t//Your code here ...\n}\n\nconst store = (request: Request, response: Response) => {\n\t//Your code here ...\n}\n\nconst show = (request: Request, response: Response) => {\n\t//Your code here ...\n}\n\nconst update = (request: Request, response: Response) => {\n\t//Your code here ...\n}\n\nconst destroy = (request: Request, response: Response) => {\n\t//Your code here ...\n}\n\nexport default {index,store,show,update,destroy}\n`,
      err => {
        if (err) {
            console.log(err)
        }
      }
    );

    fs.writeFile(
        path.join(__dirname, `../src/routes/partials/${str.lower(name)}.ts`),
        `import { Express } from "express";\nimport ${str.camel(name)}Controller from "../../controllers/${str.camel(name)}Controller";\n\nexport const init = (app: Express) => {\n\tapp.get('/${str.lower(name)}', ${str.camel(name)}Controller.index);\n\tapp.post('/${str.lower(name)}', ${str.camel(name)}Controller.store);\n\tapp.get('/${str.lower(name)}/:id', ${str.camel(name)}Controller.show);\n\tapp.put('/${str.lower(name)}/:id', ${str.camel(name)}Controller.update);\n\tapp.delete('/${str.lower(name)}/"id', ${str.camel(name)}Controller.destroy);\n}\n`,
        err => {
            if(err) {
                console.log(err)
            }
        }
    );

    console.log("File has been create, now edit file at controllers folder!".green)
  } else {
    console.log("Upps, kamu tidak menyertakan nama model, Bro!".red);
  }
};

exports.make = make;
