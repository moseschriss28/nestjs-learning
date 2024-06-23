import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
class UserHobbies {
    @Prop()
    hobbyName: string;
}

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop()
    likes: any[]; /// aany type

    @Prop({ type: [UserHobbies] })
    hobbies: UserHobbies[] /// proper array of objects
}

export const UserSchema = SchemaFactory.createForClass(User);