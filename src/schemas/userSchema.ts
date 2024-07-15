import { PrismaClient } from "@prisma/client";
import { z, ZodError } from 'zod';
import ValidationException from "../exceptions/validationException";

/**
 * Schema is an instance of zod object that will be validate the request.
 * This is an minimal example of a schema that use dsatabase validation.
 * You can use it later.
 */

const conn = new PrismaClient();

const userObject = z.object({
    name: z.string(),
    email: z.string().refine(async (v) => {
        const user = await conn.user.findUnique({
            where: {
                email: v
            }
        });

        conn.$disconnect();

        return !user;
    }, {
        message: "Email already exist"
    })
});

const validate = async (data: object) => {
    try {
        return await userObject.parseAsync(data);
    } catch (error) {
        if (error instanceof ZodError) {
            throw new ValidationException(error);
        }

        throw error;
    }
}

export default { validate };