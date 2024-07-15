var colors = require("colors");
var path = require("path");
var str = require("case");

colors.enable();

const make = (name = null) => {
  if (name) {
    console.log(`Creating model ${name}`.blue);
    const fs = require("node:fs");

    fs.appendFile(
      path.join(__dirname, "../prisma/schema.prisma"),
      `\nmodel ${str.pascal(
        name
      )} {\n\tid\t\t\tInt\t\t\t@id @default(autoincrement())\n}\n`,
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );

    fs.writeFile(
      path.join(__dirname, `../src/models/${str.camel(name)}Model.ts`),
      `import { PrismaClient, ${str.pascal(name)} } from \"@prisma/client\";\n
const conn = new PrismaClient();\n
const findAll = async () => {
    return conn.${str.lower(name)}.findMany();
};

const create = async (${str.lower(name)}: ${str.pascal(name)}) => {
    try {
        return conn.${str.lower(name)}.create({
            \'data\': ${str.lower(name)}
        });
    } catch (error) {
        throw error;
    }
}

const find = async (id: number) => {
    return conn.${str.lower(name)}.findFirst({
        where: {
            id: id
        }
    });
}

const update = async (id: number, ${str.lower(name)}: ${str.pascal(name)}) => {
    return conn.${str.lower(name)}.update({
        data: ${str.lower(name)},
        where: {
            \'id\': id
        }
    });
}

const destroy = async (id: number) => {
    return conn.${str.lower(name)}.delete({
        where: {
            \'id\': id
        }
    })
}

export default {findAll, create, update, destroy, conn}`,
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );

    console.log(
      `Don't forget to edit the schema inside prisma folder, then migrate it`
        .green
    );
  } else {
    console.log("Upps, kamu tidak menyertakan nama model, Bro!".red);
  }
};

exports.make = make;
