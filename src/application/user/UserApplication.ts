import { injectable, inject } from 'inversify';
import { TYPES } from '../../constants/types';
import { ApplicationError } from '../../core/ApplicationError';
import { IUserRepository } from '../../domain/user/IUserRepository';
import { UserDto } from './dtos/UserDto';
import { User } from '../../domain/user/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import * as path from 'path';

@injectable()
export class UserApplication {
  
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository,
    ) {}

    async getAllUsers(): Promise<any[]> {
        const users = await this.userRepository.findAll();
        return users.map(user => new UserDto(user.guid, user.email ,user.firstname, user.lastname));
    }

    async getUserById(id: string): Promise<any | null> {
        const user = await this.userRepository.findOneById(id);
        if (!user) throw new ApplicationError('404', 404, 'The user with the requested ID does not exist');
        return new UserDto(user.guid, user.email ,user.firstname, user.lastname);
    }

    async authenticate({username, password}: any): Promise<any | null> {
        const user = await this.userRepository.findUser( username );
        const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'),'utf8');
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ sub: user.guid }, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
            return token;
        }
    }

    async credentials({username, password}: any): Promise<any | null> {
        const user = await this.userRepository.findUser( username );
        if (!user) {
            throw 'Invalid login credentials';
        }
        const isPasswordMatch = await bcrypt.compareSync(password, user.password);
        if (!isPasswordMatch) {
            throw 'Invalid login credentials';
        }
        return user;
    }

    async createUser({ email, firstname, lastname, username, password }: any): Promise<void> {

        if (await this.userRepository.findUser( username )) {
            throw 'Username "' + username + '" is already taken';
        }
        // hash password
        if (password) {
            password = bcrypt.hashSync(password, 10);
        }
        const user = User.create({ email, firstname, lastname, username, password });
        await this.userRepository.save(user);
    }

    async updateUserById(id: string,{ email, firstname, lastname, username, password }: any ): Promise<void> {
        const user = await this.userRepository.findOneById(id);
        if (!user) throw 'User not found';
        
        // hash password if it was entered
        if (password) {
            password = bcrypt.hashSync(password, 10);
        }
        // copy userParam properties to user
        Object.assign(user, { email, firstname, lastname, username, password });

        await this.userRepository.save(user);
    }

    async deleteUserById(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
