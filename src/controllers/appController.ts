import { Request, Response } from "express";

const index = (request: Request, response: Response) => {
    response.json({
        'message': 'Hello from Bun!'
    });
}

export default {index}