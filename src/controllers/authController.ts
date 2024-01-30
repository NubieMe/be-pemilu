import { Request, Response } from "express";
import AuthService from "../services/authService";

export default new (class AuthController {
    async login(req: Request, res: Response) {
        try {
            const data = {
                username: req.query.username,
                password: req.query.password,
            };
            const result = await AuthService.login(data);

            return res
                .status(200)
                .cookie("T.id", result.token, {
                    httpOnly: true,
                    sameSite: "none",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
                .json(result);
        } catch (error) {
            return res.status(error.status || 500).json(error.message);
        }
    }

    async logout(req: Request, res: Response) {
        try {
            return res.status(200).clearCookie("T.id").json({ message: "Logout successfully" });
        } catch (error) {
            return res.status(error.status || 500).json(error.message);
        }
    }

    async register(req: Request, res: Response) {
        try {
            const result = await AuthService.register(req.body);

            return res
                .status(201)
                .cookie("T.id", result.token, {
                    httpOnly: true,
                    sameSite: "none",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
                .json(result);
        } catch (error) {
            return res.status(error.status || 500).json(error.message);
        }
    }
})();
