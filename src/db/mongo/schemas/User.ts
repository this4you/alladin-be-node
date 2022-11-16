import { Schema, model } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    password: string;
    company: Schema.Types.ObjectId
}

const schema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
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

