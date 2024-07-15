import { Express } from "express";
import appControler from "../../controllers/appController";

export const init = function (app: Express) {
    app.get('/', appControler.index);
};
