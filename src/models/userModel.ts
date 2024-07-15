import { PrismaClient } from "@prisma/client";

/**
 * This is not a real model, just the extend of Prisma's model,
 * for abstracting the database operation on the model. You are
 * free to define your own function. This is example only.
 */

const conn = new PrismaClient();

const findAll = async () => {
    return conn.user.findMany();
};

const create = async (user: {
    name: string,
    email: string
}) => {
    try {
        return conn.user.create({
            'data': user
        });
    } catch (error) {
        throw error;
    }
}

const find = async (id: number) => {
    return conn.user.findFirst({
        where: {
            id: id
        }
    });
}

const update = async (id: number, user: {
    name: string,
    email: string
}) => {
    return conn.user.update({
        data: user,
        where: {
            'id': id
        }
    });
}

const destroy = async (id: number) => {
    return conn.user.delete({
        where: {
            'id': id
        }
    })
}

export default {findAll, create, update, destroy, conn}