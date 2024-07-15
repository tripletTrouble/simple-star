import { Express } from "express";
import userController from "../../controllers/userController";

/**
 * Patial routes is represent resource action such as store, getAll,
 * show, update, and destroy. You can use controller or define
 * your function driectly.
 */

export const init = (app: Express) => {
    app.get('/users', userController.index);
    app.post('/users', userController.store);
}