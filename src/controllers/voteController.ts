import { Request, Response } from "express";
import VoteService from "../services/voteService";

export default new (class VoteController {
    async vote(req: Request, res: Response) {
        try {
            const session = res.locals.session;
            const result = await VoteService.vote(req.body, session);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 500).json(error.message);
        }
    }

    async results(req: Request, res: Response) {
        try {
            const result = await VoteService.results();

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 500).json(error.message);
        }
    }
})();
