import { ZodError } from "zod";

class ValidationException extends Error {
    errors;
    message: string;

    constructor(error: ZodError) {
        let message = error.issues[0].message;

        if (error.issues.length > 1) {
            message += ` and ${error.issues.length - 1} others`
        }

        const errors = error.issues.map(item => {
            const pathName = item.path.join('.');

            return {
                [pathName]: item.message
            }
        })

        super(message)
        this.errors = errors;
        this.message = message;
    }
}

export default ValidationException;