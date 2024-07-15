import { Request, Response } from "express";
import userModel from "../models/userModel";
import userSchema from "../schemas/userSchema";
import ValidationException from "../exceptions/validationException";

/**
 * A controller that control the data then send it into another handler
 * if you wish, or handle the data imidiately here. It's up to you.
 * Don't forget to call them in the routes section.
 */

const index = async (request: Request, response: Response) => {
    userModel.findAll()
        .then(async (users) => {
            await userModel.conn.$disconnect();
            response.json(users);
        }).catch(async (error) => {
            console.error(error);
        });
}

const store = async (request: Request, response: Response) => {
    try {
        const validated = await userSchema.validate(request.body);
        const newUser = await userModel.create(validated);

        await userModel.conn.$disconnect();
        response.json(newUser);
    } catch (error) {
        if (error instanceof ValidationException) {
            response.status(422);
            response.json(error);
        } else {
            console.log(error);
            response.status(500);
            response.json({
                message: "Upps, something went wrong!"
            })
        }
    }
}

export default { store, index };