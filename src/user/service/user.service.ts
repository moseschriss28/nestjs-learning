import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    getAllUsers() {
        return {
            users: [
                {
                    name: 'Moses'
                },
                {
                    name: 'Christaepher'
                }
            ]
        }
    }

    getUserById() {
        return {
            userId: '1234',
            name: 'Moses'
        }
    }

    getUserByUserIdInterceptor() {
        return {
            userId: '1234',
            name: 'Moses'
        }
    }
}