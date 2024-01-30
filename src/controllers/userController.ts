import { Request, Response } from "express";
import UserService from "../services/userService";

export default new (class UserController {
    async getCurrent(req: Request, res: Response) {
        try {
            const session = res.locals.session;
            const result = await UserService.getCurrent(session.username);

            return res.status(200).json(result);
        } catch (error) {
            res.status(error.status || 500).json(error.message);
        }
    }

    async find(req: Request, res: Response) {
        try {
            const result = await UserService.find();

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 500).json(error);
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const where = req.params;
            const result = await UserService.findOne(where);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 500).json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const session = res.locals.session;
            const where = req.params;
            const result = await UserService.update(where, req.body, session);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 500).json(error.message);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const session = res.locals.session;
            const where = req.params;
            const result = await UserService.delete(where, session);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 500).json(error.message);
        }
    }
})();
