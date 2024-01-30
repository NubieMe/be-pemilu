import { Equal, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { validate } from "../utils/validator/validation";
import { voteSchema } from "../utils/validator/userValidator";
import ResponseError from "../error/responseError";
import { Paslon } from "../entity/Paslon";
import * as bcrypt from "bcrypt";

export default new (class UserService {
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

    async find() {
        return this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.paslon", "paslon")
            .select([
                "user.id",
                "user.fullName",
                "user.address",
                "user.gender",
                "user.paslon",
                "paslon.id",
                "paslon.name",
            ])
            .getMany();
    }

    async findOne(id) {
        return this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.paslon", "paslon")
            .where("user.id = :id", id)
            .select([
                "user.id",
                "user.username",
                "user.fullName",
                "user.address",
                "user.gender",
                "user.paslon",
                "user.isAdmin",
                "paslon.id",
                "paslon.name",
            ])
            .getOne();
    }

    async getCurrent(username) {
        return this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.paslon", "paslon")
            .where({ username })
            .select([
                "user.id",
                "user.username",
                "user.fullName",
                "user.address",
                "user.gender",
                "user.paslon",
                "user.isAdmin",
                "paslon.id",
                "paslon.name",
            ])
            .getOne();
    }

    async update(where, data, session) {
        if (where !== session.id) throw new ResponseError(403, "Cannot edit other's Profile!");
        let user;

        if (!data.password) {
            user = {
                username: data.username,
                fullName: data.fullName,
                address: data.address,
                gender: data.gender,
            };
        } else {
            const hash = bcrypt.hash(data.password, 10);
            user = {
                username: data.username,
                password: hash,
                fullName: data.fullName,
                address: data.address,
                gender: data.gender,
            };
        }

        const response = await this.userRepository.update(where, user);

        return {
            message: "Account updated successfully",
            user: data.username,
        };
    }

    async delete(where, session) {
        if (where.id !== session.user.id) throw new ResponseError(401, "Unauthorized");

        const find = await this.userRepository.findOneBy(where);
        if (!find) throw new ResponseError(404, "Not Found");

        const response = await this.userRepository.delete(where);
        return {
            message: "Account deleted successfully!",
        };
    }
})();
