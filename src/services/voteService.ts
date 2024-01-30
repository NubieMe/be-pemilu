import { Equal, Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import ResponseError from "../error/responseError";
import { validate } from "../utils/validator/validation";
import { voteSchema } from "../utils/validator/userValidator";
import { Paslon } from "../entity/Paslon";

export default new (class VoteService {
    private readonly VoteRepository: Repository<User> = AppDataSource.getRepository(User);

    async vote(data, session) {
        const chkPaslon = await this.VoteRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.paslon", "paslon")
            .where("user.id = :id", { id: session.user.id })
            .select(["user.id", "user.paslon", "paslon.id"])
            .getOne();

        if (chkPaslon.paslon !== null) throw new ResponseError(403, "You can only vote once!");

        const isValid = validate(voteSchema, data);
        const inputVote = await this.VoteRepository.update({ id: session.user.id }, isValid);

        return {
            message: "Voting Success",
            voted: isValid.paslon,
        };
    }

    async results() {
        const paslon = await AppDataSource.getRepository(Paslon).findAndCount();
        let result = [];
        const len = paslon[1] + 1;
        for (let i = 1; i < len; i++) {
            result.push(await this.VoteRepository.countBy({ paslon: Equal(i) }));
        }

        await Promise.all(result);
        return {
            message: "Vote Result",
            data: result,
        };
    }
})();
