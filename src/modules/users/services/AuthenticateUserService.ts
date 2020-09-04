import {sign} from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider  from '../providers/HashProvider/models/IHashProvider';
import {injectable, inject} from 'tsyringe';

interface IRequest {
    email: string;
    password: string;

}

interface IResponse{
    user: User,
    token: string

}

@injectable()
export default class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider:  IHashProvider,

        ) {

    }

    public async execute ({email, password} : IRequest) : Promise<IResponse> {


        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorret email/password combination', 401);

        }

        const passwordMateched = await this.hashProvider.compareHash(password, user.password)
        if (!passwordMateched) {
            throw new AppError('Incorret email/password combination', 401);

        }

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret ,  {
            subject: user.id,
            expiresIn,

        })

        return {
            user,
            token
        }

    }
}