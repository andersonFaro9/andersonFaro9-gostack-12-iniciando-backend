import {getRepository} from 'typeorm'
import User from '../models/User'
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'
interface Request {
    email: string;
    password: string;

}

interface Response{
    user: User,
    token: string

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

        const token = sign({},'908d081f1123e7fe79747a2adf1943ab' ,  {
            subject: user.id,
            expiresIn: '1d',

        })

        return {
            user,
            token
        }

    }
}
