import { Schema, model } from 'mongoose';
import { UserRole } from '../../../lib/model/UserRole';

interface IUser {
    name: string;
    email: string;
    password: string;
    company: Schema.Types.ObjectId;
    role: string;
}

const schema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
        role: { type: String, enum: UserRole, required: true, default: 'user' }
    },
    {
        id: true,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

export const UserEntity = model<IUser>('Users', schema);
