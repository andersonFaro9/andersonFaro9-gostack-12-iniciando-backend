import {getRepository} from 'typeorm'
import User from '../models/User'
import {compare} from 'bcryptjs'

interface Request {
    email: string;
    password: string;

}

interface Response{
    user: User

}
export default class AuthenticateUserService {
    public async execute ({email, password} : Request) : Promise<Response> {

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({where: {email}});

        if (!user) {
            throw new Error('Incorret email/password combination');

        }

        const passwordMateched = await compare(password, user.password)
        if (!passwordMateched) {
            throw new Error('Incorret email/password combination');

        }

        return {
            user
        }

    }
}
